import { getAuthSession } from "@/lib/auth"; // استيراد دالة للحصول على جلسة المصادقة
import { db } from "@/lib/db"; // استيراد كائن قاعدة البيانات
import { NextResponse } from "next/server"; // استيراد NextResponse للتعامل مع الاستجابة
import { z } from "zod"; // استيراد مكتبة Zod للتحقق من البيانات

// دالة للتعامل مع طلبات POST
export async function POST(request: Request) {
  // الحصول على جلسة المصادقة
  const session = await getAuthSession();

  // التحقق مما إذا كان المستخدم مصرحًا له
  if (!session?.user) {
    return new Response("Unauthorized", {
      status: 400,
      statusText: "Unauthorized User", // نص الحالة
    });
  }

  // قراءة جسم الطلب كـ JSON
  const body: unknown = await request.json();

  // التحقق من صحة البيانات باستخدام Zod
  const result = z
    .object({
      profileImage: z.string(), // يجب أن يكون profileImage من نوع string
    })
    .safeParse(body); // محاولة تحليل البيانات بأمان

  // التحقق مما إذا كانت البيانات المدخلة صحيحة
  if (!result.success) {
    return NextResponse.json("ERRORS.WRONG_DATA", { status: 401 }); // إرجاع خطأ إذا كانت البيانات غير صحيحة
  }

  const { profileImage } = result.data; // استخراج profileImage من البيانات المدخلة

  try {
    // البحث عن المستخدم في قاعدة البيانات باستخدام معرف الجلسة
    const user = await db.user.findUnique({
      where: {
        id: session.user.id, // استخدام معرف المستخدم من الجلسة
      },
    });

    // التحقق مما إذا كان المستخدم موجودًا
    if (!user) {
      return new NextResponse("User not found", {
        status: 404,
        statusText: "User not Found", // نص الحالة
      });
    }

    // تحديث صورة الملف الشخصي في قاعدة البيانات
    const updatedUser = await db.user.update({
      where: {
        id: session.user.id, // استخدام معرف المستخدم من الجلسة
      },
      data: {
        image: profileImage, // تعيين الصورة الجديدة
      },
    });

    // إرجاع المستخدم المحدث
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error occurred:", error); // سجل الخطأ

    // التعامل مع الأخطاء في حالة وجود مشكلة في قاعدة البيانات
    return NextResponse.json("ERRORS.DB_ERROR", { status: 405 });
  }
}
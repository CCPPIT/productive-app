/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAuthSession } from "@/lib/auth"; // استيراد دالة للحصول على جلسة المصادقة
import { db } from "@/lib/db"; // استيراد كائن قاعدة البيانات
import { NextResponse } from "next/server"; // استيراد NextResponse للتعامل مع الاستجابة

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

    // تحديث صورة المستخدم لتكون null (إزالة الصورة)
    const updatedUser = await db.user.update({
      where: {
        id: session.user.id, // استخدام معرف المستخدم من الجلسة
      },
      data: {
        image: null, // تعيين الصورة إلى null
      },
    });

    // إرجاع المستخدم المحدث
    return NextResponse.json(updatedUser, { status: 200 });
  } catch  {
    // التعامل مع الأخطاء في حالة وجود مشكلة في قاعدة البيانات
    return NextResponse.json("ERRORS.DB_ERROR", { status: 405 });
  }
}
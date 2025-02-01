/* eslint-disable @typescript-eslint/no-unused-vars */ // تعطيل قاعدة ESLint للتحذير من المتغيرات غير المستخدمة.

import { db } from "@/lib/db"; // استيراد كائن db للتفاعل مع قاعدة البيانات.
import { NextResponse } from "next/server"; // استيراد NextResponse لإنشاء استجابات HTTP في Next.js.

export const GET = async (request: Request) => { // تعريف دالة GET غير متزامنة لمعالجة الطلبات.
  const url = new URL(request.url); // إنشاء كائن URL باستخدام عنوان الطلب.
  const workspaceId = url.searchParams.get("workspaceId"); // استخراج معرف مساحة العمل من معلمات الاستعلام.

  // التحقق مما إذا كان معرف مساحة العمل غير موجود.
  if (!workspaceId)
    return NextResponse.json("ERRORS.NO_WORKSPACE", { status: 404 }); // إرجاع استجابة خطأ إذا لم يكن موجودًا.

  try {
    // البحث عن المستخدمين الذين لديهم اشتراكات في مساحة العمل المحددة.
    const users = await db.user.findMany({
      where: {
        subscriptions: {
          some: { workspaceId }, // التحقق من وجود اشتراك في مساحة العمل.
        },
      },
      include: {
        subscriptions: { // تضمين الاشتراكات المرتبطة بالمستخدمين.
          where: {
            workspaceId, // تصفية الاشتراكات بناءً على معرف مساحة العمل.
          },
          select: {
            userRole: true, // تحديد أن نريد الحصول على دور المستخدم فقط.
          },
        },
      },
    });

    // تحويل البيانات المسترجعة إلى الشكل المطلوب.
    const returnUsers = users.map((user) => {
      return {
        id: user.id, // معرف المستخدم.
        username: user.username, // اسم المستخدم.
        image: user.image, // صورة المستخدم.
        userRole: user.subscriptions[0].userRole, // دور المستخدم من الاشتراك الأول.
        lastTimeActive: user // يمكن تعديل هذا لاحقًا ليعكس الوقت الفعلي للنشاط.
      };
    });

    return NextResponse.json(returnUsers, { status: 200 }); // إرجاع قائمة المستخدمين مع حالة 200 (ناجحة).
  } catch (_) {
    // معالجة الأخطاء المحتملة أثناء الاستعلام.
    return NextResponse.json("ERRORS.DB_ERROR", { status: 405 }); // إرجاع رسالة خطأ إذا حدثت مشكلة في قاعدة البيانات.
  }
};
/* eslint-disable @typescript-eslint/no-unused-vars */ // تعطيل قاعدة ESLint للتحذير من المتغيرات غير المستخدمة.

import { db } from "@/lib/db"; // استيراد كائن db للتفاعل مع قاعدة البيانات.
import { NextResponse } from "next/server"; // استيراد NextResponse لإنشاء استجابات HTTP في Next.js.

export const GET = async (request: Request) => { // تعريف دالة GET غير متزامنة لمعالجة الطلبات.
    const url = new URL(request.url); // إنشاء كائن URL باستخدام عنوان الطلب.
    const userId = url.searchParams.get('userId'); // استخراج معرّف المستخدم من معلمات الاستعلام.
    const workspaceId = url.searchParams.get('workspaceId'); // استخراج معرّف مساحة العمل من معلمات الاستعلام.

    // التحقق مما إذا كان معرّف المستخدم أو معرّف مساحة العمل غير موجود.
    if (!userId || !workspaceId) {
        return NextResponse.json("ERRORS.NO_USER_API", { status: 404 }); // إرجاع استجابة خطأ إذا كان أحدهما غير موجود.
    }

    try {
        // البحث عن المستخدم في قاعدة البيانات باستخدام معرف المستخدم.
        const user = await db.user.findUnique({
            where: {
                id: userId // تحديد المستخدم بناءً على معرّف المستخدم.
            },
            include: {
                subscriptions: { // تضمين الاشتراكات المرتبطة بالمستخدم.
                    where: {
                        workspaceId, // تصفية الاشتراكات بناءً على معرف مساحة العمل.
                    },
                    select: {
                        userRole: true, // تحديد أن نريد الحصول على دور المستخدم فقط.
                        // workspaceId: true // يمكن إضافة هذا إذا كنت بحاجة إلى معرف مساحة العمل.
                    }
                }
            }
        });

        // التحقق مما إذا كان المستخدم موجودًا.
        if (!user) return NextResponse.json("ERRORS.NO_USER_API", { status: 404 }); // إرجاع استجابة خطأ إذا لم يتم العثور على المستخدم.

        const userRole = user.subscriptions[0].userRole; // الحصول على دور المستخدم من الاشتراك الأول.
        return NextResponse.json(userRole, { status: 200 }); // إرجاع دور المستخدم مع حالة 200 (ناجحة).

        // يمكنك استخدام الكود التالي كبديل:
        // const userRole = user.subscriptions.find((sub) => sub.workspaceId === workspaceId)?.userRole

    } catch (_) {
        // معالجة الأخطاء المحتملة.
        return NextResponse.json("ERRORS.NO_USER_API", { status: 405 }); // إرجاع استجابة خطأ إذا حدثت مشكلة.
    }
}
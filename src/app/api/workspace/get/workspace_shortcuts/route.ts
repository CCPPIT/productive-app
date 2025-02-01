/* eslint-disable @typescript-eslint/no-unused-vars */ // تعطيل قاعدة ESLint للتحذير من المتغيرات غير المستخدمة.

import { db } from "@/lib/db"; // استيراد كائن db للتفاعل مع قاعدة البيانات.
import { NextResponse } from "next/server"; // استيراد NextResponse لإنشاء استجابات HTTP في Next.js.

export const GET = async (request: Request) => { // تعريف دالة GET غير متزامنة لمعالجة الطلبات.
    const url = new URL(request.url); // إنشاء كائن URL باستخدام عنوان الطلب.
    const workspaceId = url.searchParams.get('workspaceID'); // استخراج معرف مساحة العمل من معلمات الاستعلام.

    // التحقق مما إذا كان معرف مساحة العمل غير موجود.
    if (!workspaceId) return NextResponse.json("ERRORS.NO_WORKSPACE", { status: 404 }); // إرجاع استجابة خطأ إذا لم يكن موجودًا.

    try {
        // البحث عن مساحة العمل في قاعدة البيانات باستخدام معرفها.
        const workspaceShortcuts = await db.workspace.findUnique({
            where: {
                id: workspaceId, // تحديد مساحة العمل بناءً على معرفها.
            },
            include: {
                tasks: { // تضمين المهام المرتبطة بمساحة العمل.
                    select: {
                        id: true, // تحديد أن نريد الحصول على معرف المهمة.
                        emoji: true, // تحديد أن نريد الحصول على الرموز التعبيرية المرتبطة بالمهمة.
                        title: true, // تحديد أن نريد الحصول على عنوان المهمة.
                    }
                },
                mindMaps: { // تضمين خرائط العقل المرتبطة بمساحة العمل.
                    select: {
                        id: true, // تحديد أن نريد الحصول على معرف خريطة العقل.
                        title: true, // تحديد أن نريد الحصول على عنوان خريطة العقل.
                        emoji: true // تحديد أن نريد الحصول على الرموز التعبيرية المرتبطة بخريطة العقل.
                    }
                }
            }
        });

        // التحقق مما إذا كانت مساحة العمل موجودة.
        if (!workspaceShortcuts)
            return NextResponse.json("Workspace Shortcuts not found", { status: 200 }); // إرجاع رسالة إذا لم يتم العثور على مساحة العمل.

        return NextResponse.json(workspaceShortcuts, { status: 200 }); // إرجاع بيانات مساحة العمل مع حالة 200 (ناجحة).

    } catch (err) {
        // معالجة الأخطاء المحتملة أثناء الاستعلام.
        return NextResponse.json("ERRORS.DB_ERROR", { status: 405 }); // إرجاع رسالة خطأ إذا حدثت مشكلة في قاعدة البيانات.
    }
}
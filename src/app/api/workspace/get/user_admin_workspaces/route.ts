/* eslint-disable @typescript-eslint/no-unused-vars */
// تعطيل تحذير ESLint لعدم وجود متغيرات غير مستخدمة

import { db } from "@/lib/db"; // استيراد قاعدة البيانات من مكتبة محلية
import { sub } from "date-fns"; // استيراد دالة "sub" من مكتبة date-fns (التي لم تُستخدم في الكود الحالي)
import { NextResponse } from "next/server"; // استيراد NextResponse للتعامل مع استجابات Next.js

// تعريف دالة GET التي تعالج الطلبات من نوع GET
export const GET = async (request: Request) => {
    const url = new URL(request.url); // إنشاء كائن URL من عنوان الطلب
    const userId = url.searchParams.get('userId'); // استخراج userId من معلمات الاستعلام

    // إذا لم يتم توفير userId، إرجاع استجابة خطأ
    if (!userId) return NextResponse.json("ERRORS.NO_USER_API", { status: 404 });

    try {
        // استعلام قاعدة البيانات لجلب الاشتراكات للمستخدم
        const subscriptions = await db.subscription.findMany({
            where: {
                userId, // التحقق من userId
                OR: [{ userRole: "ADMIN" }, { userRole: "OWNER" }] // التحقق من الأدوار (ADMIN أو OWNER)
            },
            include: {
                workspace: true // تضمين معلومات workspace في النتائج
            }
        });

        // استخراج workspaces من الاشتراكات
        const workspace = subscriptions.map((subscription) =>
            subscription.workspace // استخدام دالة map لجلب workspace من كل اشتراك
        );

        // إذا لم توجد workspaces، إرجاع مصفوفة فارغة
        if (!workspace.length) return NextResponse.json([], { status: 200 });

        // إرجاع workspaces الموجودة
        return NextResponse.json(workspace, { status: 200 });

    } catch (error) {
        // في حالة حدوث خطأ في قاعدة البيانات، إرجاع رسالة خطأ
        console.error("Database error:", error); // تسجيل الخطأ في وحدة التحكم
        return NextResponse.json("ERRORS.DB_ERROR", { status: 500 }); // استخدام حالة 500 لمشاكل الخادم
    }
}
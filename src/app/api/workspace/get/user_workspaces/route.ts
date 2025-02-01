/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/lib/db"; // استيراد اتصال قاعدة البيانات
import { NextResponse } from "next/server"; // استيراد NextResponse من Next.js

// دالة GET لمعالجة طلبات GET
export const GET = async (request: Request) => {
    const url = new URL(request.url); // إنشاء كائن URL من الطلب
    const userId = url.searchParams.get('userId'); // الحصول على userId من معلمات الاستعلام
    if (!userId) return NextResponse.json("ERRORS.NO_USER_API", { status: 404 }); // إرجاع خطأ 404 إذا لم يكن userId موجودًا

    try {
        // البحث عن الاشتراكات الخاصة بالمستخدم
        const subscriptions = await db.subscription.findMany({
            where: {
                userId // تحديد الاشتراكات بواسطة userId
            },
            include: {
                workspace: true // تضمين بيانات مساحة العمل المرتبطة بالاشتراكات
            }
        });

        // استخراج مساحات العمل من الاشتراكات
        const workspace = subscriptions.map(
            (subscription) => subscription.workspace // إرجاع بيانات مساحة العمل
        );

        // إذا لم تكن هناك مساحات عمل، إرجاع مصفوفة فارغة
        if (!workspace.length) return NextResponse.json([], { status: 200 });
        
        // إرجاع بيانات مساحات العمل
        return NextResponse.json(workspace, { status: 200 });
    } catch (error) {
        // معالجة الأخطاء المتعلقة بقاعدة البيانات
        return NextResponse.json("ERRORS.DB_ERROR", { status: 405 });
    }
};
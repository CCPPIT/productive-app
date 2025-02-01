/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/lib/db"; // استيراد اتصال قاعدة البيانات
import { NextResponse } from "next/server"; // استيراد NextResponse من Next.js

// تعريف واجهة Params لتحديد نوع المعلمات المرسلة إلى الدالة
interface Params {
    params: { workspace_id: string }
}

// دالة GET لمعالجة طلبات GET
export const GET = async ({ params: { workspace_id } }: Params, request: Request) => {
    const url = new URL(request.url); // إنشاء كائن URL من الطلب
    const userId = url.searchParams.get("userId"); // الحصول على userId من معلمات الاستعلام
    if (!userId) return NextResponse.json("ERRORS.NO_USER_API", { status: 404 }); // إذا لم يكن userId موجودًا، إرجاع خطأ 404

    try {
        // البحث عن مساحة العمل في قاعدة البيانات
        const workspace = await db.workspace.findUnique({
            where: {
                id: workspace_id, // تحديد مساحة العمل بواسطة معرفها
                subscribers: {
                    some: { userId } // التأكد من أن المستخدم مشترك في هذه المساحة
                }
            },
        });

        // إذا لم يتم العثور على مساحة العمل، إرجاع رسالة مناسبة
        if (!workspace) return NextResponse.json("Workspace not found", { status: 200 });
        
        // إرجاع تفاصيل مساحة العمل
        return NextResponse.json(workspace, { status: 200 });

    } catch (error) {
        // معالجة الأخطاء المتعلقة بقاعدة البيانات
        return NextResponse.json("ERRORS.DB_ERROR", { status: 405 });
    }
};
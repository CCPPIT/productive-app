/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/lib/db"; // استيراد كائن db من مكتبة قاعدة البيانات، والذي يُستخدم للتفاعل مع قاعدة البيانات.
import { NextResponse } from "next/server"; // استيراد NextResponse من مكتبة Next.js، والتي تُستخدم لإنشاء استجابات HTTP.

export const GET = async (request: Request) => { // تعريف دالة GET كدالة غير متزامنة تستقبل طلبًا.
    const url = new URL(request.url); // إنشاء كائن URL باستخدام عنوان الطلب.
    const userId = url.searchParams.get("userId"); // استخراج معرّف المستخدم من معلمات الاستعلام في عنوان URL.
    
    // التحقق مما إذا كان معرّف المستخدم موجودًا.
    if (!userId) return NextResponse.json("ERRORS.NO_USER_API", { status: 404 }); // إرجاع استجابة خطأ إذا لم يكن معرّف المستخدم موجودًا.
    
    try {
        // استعلام لقاعدة البيانات للبحث عن الاشتراكات الخاصة بالمستخدم.
        const subscriptions = await db.subscription.findMany({
            where: {
                userId, // تحديد اشتراكات المستخدم بناءً على معرّف المستخدم.
                NOT: { userRole: "READ_ONLY" } // استبعاد الاشتراكات التي تحتوي على دور المستخدم "READ_ONLY".
            },
            include: {
                workspace: true // تضمين بيانات مكان العمل المرتبط بكل اشتراك.
            }
        });

        // استخراج أماكن العمل من الاشتراكات.
        const workspace = subscriptions.map((subscription) => subscription.workspace);
        
        // التحقق مما إذا كانت هناك أماكن عمل مستخرجة.
        if (!workspace) return NextResponse.json([], { status: 200 }); // إذا لم يكن هناك أماكن عمل، إرجاع مصفوفة فارغة.

        return NextResponse.json(workspace, { status: 200 }); // إرجاع أماكن العمل مع حالة 200 (ناجحة).

    } catch (_) {
        // معالجة الأخطاء المحتملة أثناء الاستعلام.
        return NextResponse.json("ERRORS.DB_ERROR", { status: 405 }); // إرجاع رسالة خطأ إذا حدثت مشكلة في قاعدة البيانات.
    }
}
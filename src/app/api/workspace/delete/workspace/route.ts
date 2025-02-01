/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAuthSession } from "@/lib/auth"; // استيراد دالة لجلب جلسة المصادقة
import { db } from "@/lib/db"; // استيراد قاعدة البيانات
import { apiWorkspaceDelete, apiWorkspaceShema } from "@/schema/workspaceSchema"; // استيراد مخططات API
import { NextResponse } from "next/server"; // استيراد NextResponse للتعامل مع استجابات Next.js

// تعريف دالة POST لمعالجة طلبات حذف مساحة العمل
export async function POST(request: Request) {
    // الحصول على جلسة المصادقة
    const session = await getAuthSession();
    // التحقق مما إذا كانت الجلسة تحتوي على مستخدم
    if (!session?.user) {
        return new Response("Unauthorized", {
            status: 400, // حالة غير صحيحة
            statusText: "Unauthorized User" // نص الحالة
        });
    }

    // قراءة جسم الطلب (البيانات المدخلة)
    const body: unknown = await request.json();
    // التحقق من صحة البيانات باستخدام مخطط apiWorkspaceDelete
    const result = apiWorkspaceDelete.safeParse(body);
    // إذا كانت البيانات غير صحيحة، إرجاع خطأ
    if (!result.success) {
        return NextResponse.json("ERRORS.WRONG_DATA", { status: 401 });
    }

    // استخراج id و workspaceName من البيانات المدخلة
    const { id, workspaceName } = result.data;

    try {
        // البحث عن المستخدم في قاعدة البيانات
        const user = await db.user.findUnique({
            where: {
                id: session.user.id // البحث باستخدام معرف المستخدم
            },
            include: {
                subscriptions: { // تضمين الاشتراكات
                    where: {
                        workspaceId: id, // البحث باستخدام معرف مساحة العمل
                    },
                    select: {
                        userRole: true // تحديد الحقول المطلوبة
                    }
                },
            }
        });

        // إذا لم يتم العثور على المستخدم، إرجاع خطأ
        if (!user) {
            return new NextResponse("User not found", {
                status: 404, // حالة غير موجود
                statusText: "User not Found" // نص الحالة
            });
        }

        // التحقق من الأذونات للمستخدم
        if (user.subscriptions[0].userRole === "CAN_EDIT" || user.subscriptions[0].userRole === "READ_ONLY") {
            return NextResponse.json("ERRORS.NO_PERMISSION", { status: 403 }); // إرجاع خطأ إذا لم يكن لدى المستخدم الأذونات الصحيحة
        }

        // البحث عن مساحة العمل في قاعدة البيانات
        const workspace = await db.workspace.findUnique({
            where: {
                id, // البحث باستخدام معرف مساحة العمل
            }
        });

        // إذا لم يتم العثور على مساحة العمل، إرجاع خطأ
        if (!workspace) {
            return new NextResponse("ERRORS.NO_WORKSPACE", {
                status: 404, // حالة غير موجود
                statusText: "User not found" // نص الحالة
            });
        }

        // التحقق من أن اسم مساحة العمل المدخل يتطابق مع الاسم في قاعدة البيانات
        if (workspace.name !== workspaceName) {
            return NextResponse.json("ERRORS.WRONG_WORKSPACE_NAME", { status: 403 }); // إرجاع خطأ إذا كان الاسم غير صحيح
        }

        // حذف مساحة العمل من قاعدة البيانات
        await db.workspace.delete({
            where: {
                id // حذف باستخدام معرف مساحة العمل
            }
        });

        // إرجاع استجابة ناجحة
        return NextResponse.json("OK", { status: 200 });

    } catch (error) {
        // التعامل مع الأخطاء أثناء العملية
        return NextResponse.json("ERRORS.DB_ERROR", { status: 405 }); // إرجاع خطأ
    }
}
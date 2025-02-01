/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAuthSession } from "@/lib/auth"; // استيراد دالة لجلب جلسة المصادقة
import { db } from "@/lib/db"; // استيراد قاعدة البيانات
import { apiWorkspaceEditData } from "@/schema/workspaceSchema"; // استيراد مخطط بيانات تعديل مساحة العمل
import { NextResponse } from "next/server"; // استيراد NextResponse للتعامل مع استجابات Next.js

// تعريف دالة POST لمعالجة طلبات تعديل مساحة العمل
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
    // التحقق من صحة البيانات باستخدام مخطط apiWorkspaceEditData
    const result = apiWorkspaceEditData.safeParse(body);
    // إذا كانت البيانات غير صحيحة، إرجاع خطأ
    if (!result.success) {
        return NextResponse.json("ERRORS.WRONG_DATA", { status: 401 });
    }

    // استخراج workspaceName و color و id من البيانات المدخلة
    const { workspaceName, color, id } = result.data;

    try {
        // البحث عن المستخدم في قاعدة البيانات
        const user = await db.user.findUnique({
            where: {
                id: session.user.id // البحث باستخدام معرف المستخدم
            },
            include: {
                subscriptions: { // تضمين الاشتراكات
                    where: {
                        workspaceId: id // البحث باستخدام معرف مساحة العمل
                    },
                    select: {
                        userRole: true // تحديد الحقول المطلوبة
                    }
                }
            }
        });

        // إذا لم يتم العثور على المستخدم، إرجاع خطأ
        if (!user) {
            return new NextResponse("User not found", {
                status: 404, // حالة غير موجود
                statusText: "User not found" // نص الحالة
            });
        }

        // التحقق من الأذونات للمستخدم
        if (user.subscriptions[0].userRole === "CAN_EDIT" || user.subscriptions[0].userRole === "READ_ONLY") {
            return NextResponse.json("ERRORS.NO_PERMISSIONS", { status: 403 }); // إرجاع خطأ إذا لم يكن لدى المستخدم الأذونات الصحيحة
        }

        // تحديث بيانات مساحة العمل في قاعدة البيانات
        await db.workspace.update({
            where: {
                id // تحديث باستخدام معرف مساحة العمل
            },
            data: {
                name: workspaceName, // تحديث اسم مساحة العمل
                color // تحديث لون مساحة العمل
            }
        });

        // إرجاع استجابة ناجحة
        return NextResponse.json(result.data, { status: 200 });

    } catch (_) {
        // التعامل مع الأخطاء أثناء العملية
        return NextResponse.json("ERRORS.DB_ERROR", { status: 405 }); // إرجاع خطأ
    }
}
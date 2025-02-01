/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAuthSession } from "@/lib/auth";  // استيراد دالة لجلب جلسة المستخدم
import { db } from "@/lib/db";  // استيراد قاعدة البيانات
import { getRandomWorkspaceColor } from "@/lib/getRandomWorkspaceColor";  // استيراد دالة للحصول على لون عشوائي لمساحة العمل
import { MAX_USER_WORKSPACES } from "@/lib/options";  // استيراد الحد الأقصى لعدد مساحات العمل المسموح بها
import { apiWorkspaceShema } from "@/schema/workspaceSchema";  // استيراد مخطط بيانات مساحة العمل
import { NextResponse } from "next/server";  // استيراد NextResponse للتعامل مع الردود
import { v4 as uuidv4 } from "uuid";  // استيراد دالة لإنشاء UUIDs

// تعريف دالة للتعامل مع طلبات POST
export async function POST(request: Request) {
    // جلب جلسة المستخدم
    const session = await getAuthSession();
    
    // التحقق مما إذا كانت الجلسة تحتوي على مستخدم
    if (!session?.user) {
        return new Response("Unauthorized", {
            status: 404,
            statusText: "Unauthorized User"
        });
    }

    // جلب الجسم (body) من الطلب
    const body: unknown = await request.json();
    
    // التحقق من صحة البيانات باستخدام المخطط
    const result = apiWorkspaceShema.safeParse(body);
    if (!result.success) {
        return NextResponse.json("ERRORS.WRONG_DATA", { status: 401 });
    }

    const { workspaceName, file } = result.data;  // استخراج اسم مساحة العمل والملف

    try {
        // البحث عن المستخدم في قاعدة البيانات
        const user = await db.user.findUnique({
            where: {
                id: session.user.id
            },
            include: {
                createdWorkspaces: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        // التحقق مما إذا كان المستخدم موجودًا
        if (!user) {
            return new NextResponse("User not found", {
                status: 404,
                statusText: "User not found"
            });
        }

        // التحقق مما إذا كان المستخدم قد وصل إلى الحد الأقصى لعدد مساحات العمل
        if (user.createdWorkspaces.length === MAX_USER_WORKSPACES) {
            return new NextResponse("ERRORS.TOO_MANY_WORKSPACES", { status: 402 });
        }

        // التحقق من وجود مساحة عمل بنفس الاسم
        const theSameWorkspaceName = user.createdWorkspaces.find(
            (workspace) => workspace.name.toLowerCase() === workspaceName.toLowerCase()
        );

        if (theSameWorkspaceName) {
            return new NextResponse("ERRORS.SAME_NAME_WORKSPACE", { status: 403 });
        }

        // الحصول على لون عشوائي لمساحة العمل
        const color = getRandomWorkspaceColor();

        // إنشاء مساحة العمل الجديدة في قاعدة البيانات
        const workspace = await db.workspace.create({
            data: {
                creatorId: user.id,
                name: workspaceName,
                image: file,
                color,
                id: uuidv4(),  // إنشاء معرف فريد لمساحة العمل
                adminCode: uuidv4(),  // إنشاء كود إداري فريد
                inviteCode: uuidv4(),  // إنشاء كود دعوة فريد
                readOnlyCode: uuidv4(),  // إنشاء كود للقراءة فقط
                canEditCode: uuidv4()  // إنشاء كود للتعديل
            }
        });
        await db.subscription.create({
            data:{
                userId:user.id,
                workspaceId:workspace.id,
                userRole:"OWNER"
            }
        })
        const conversation=await db.conversation.create({
            data:{
                workspaceId:workspace.id
            }
        })

        // إرجاع مساحة العمل الجديدة
        return NextResponse.json(workspace, { status: 200 });

    } catch (error) {
        // التعامل مع الأخطاء في قاعدة البيانات
        return NextResponse.json("ERRORS.DB_ERROR", { status: 405 });
    }
}
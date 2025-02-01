import { SettingsWorkspace } from "@/types/extended";
import { UserPermission, Workspace } from "@prisma/client"; // استيراد نوع Workspace من مكتبة Prisma
import { notFound } from "next/navigation"; // استيراد دالة notFound من Next.js

// تحديد نطاق التطبيق بناءً على بيئة التشغيل
export const domain = 
    process.env.NODE_ENV === "production"
        ? "http://localhost:3000" // النطاق في بيئة الإنتاج
        : "http://localhost:3000"; // النطاق في بيئة التطوير (يمكن تعديل هذا إذا كان لديك بيئة تطوير مختلفة)

// دالة لجلب تفاصيل مساحة العمل
export const getWorkspace = async (workspace_id: string, userId: string) => {
    const res = await fetch(
        `${domain}/api/workspace/get/workspace_details/${workspace_id}?userId=${userId}`,
        {
            method: "GET", // طريقة الطلب
            cache: "no-store" // عدم تخزين البيانات في الكاش
        }
    );

    // التحقق من حالة الاستجابة
    if (!res.ok) {
        return notFound(); // إذا لم تكن الاستجابة ناجحة، يتم استدعاء دالة notFound
    }

    // إرجاع البيانات بصيغة Workspace
    return res.json() as Promise<Workspace>;
};
// دالة لجلب مساحات العمل الخاصة بالمستخدم
export const getWorkspaces = async (userId: string) => {
    // إجراء طلب GET لجلب مساحات العمل الخاصة بالمستخدم
    const res = await fetch(
        `${domain}/api/workspace/get/user_workspaces?userId=${userId}`,
        {
            method: "GET", // طريقة الطلب
            cache: "no-store" // عدم تخزين البيانات في الكاش
        }
    );

    // التحقق من حالة الاستجابة
    if (!res.ok) {
        return []; // إذا لم تكن الاستجابة ناجحة، إرجاع مصفوفة فارغة
    }

    // إرجاع البيانات بصيغة Workspace[]
    return res.json() as Promise<Workspace[]>;
};

// تصدير دالة غير متزامنة لجلب إعدادات مساحة العمل
export const getWorkspaceSettings = async (workspace_id: string, userId: string) => {
    // إجراء طلب HTTP باستخدام fetch لجلب إعدادات مساحة العمل
    const res = await fetch(
        // بناء عنوان URL باستخدام المتغيرات workspace_id و userId
        `${domain}/api/workspace/get/settings/${workspace_id}?userId=${userId}`,
        {
            method: "GET", // تحديد نوع الطلب كـ GET
            cache: "no-store" // منع التخزين المؤقت للاستجابة
        }
    );

    // التحقق من نجاح الطلب
    if (!res.ok) {
        // إذا كانت الاستجابة غير ناجحة، استدعاء دالة notFound()
        return notFound();
    }

    // تحويل الاستجابة إلى JSON وإرجاعها كوعود من نوع SettingsWorkspace
    return res.json() as Promise<SettingsWorkspace>;
}

// تعريف دالة غير متزامنة للحصول على دور المستخدم ضمن مساحة العمل المحددة.
export const getUserWorkspaceRole = async (workspace_id: string, userId: string) => {
    // إجراء طلب GET إلى API للحصول على دور المستخدم.
    const res = await fetch(
        `${domain}/api/workspace/get/user_role?workspaceId=${workspace_id}&userId=${userId}`, // بناء عنوان URL باستخدام معرف مساحة العمل ومعرف المستخدم.
        {
            method: "GET", // تحديد طريقة الطلب كـ GET.
            cache: "no-store" // منع تخزين نتيجة الطلب في ذاكرة التخزين المؤقت.
        }
    );

    // التحقق مما إذا كانت الاستجابة غير ناجحة.
    if (!res.ok) {
        return null; // إرجاع null إذا كانت الاستجابة غير ناجحة.
    }

    // تحويل الاستجابة إلى كائن JSON وإرجاعه.
    return res.json() as Promise<UserPermission>; // إرجاع كائن JSON مع توضيح النوع كـ UserPermission.
}
// تعريف دالة غير متزامنة للحصول على أماكن العمل التي يديرها المستخدم.
export const getUserAdminWorkspaces = async (userId: string) => {
    // إجراء طلب GET إلى API للحصول على أماكن العمل التي يديرها المستخدم.
    const res = await fetch(
        `${domain}/api/workspace/get/user_admin_workspaces?userId=${userId}`, // بناء عنوان URL باستخدام معرف المستخدم.
        {
            method: "GET", // تحديد طريقة الطلب كـ GET.
            cache: "no-store" // منع تخزين نتيجة الطلب في ذاكرة التخزين المؤقت.
        }
    );

    // التحقق مما إذا كانت الاستجابة غير ناجحة.
    if (!res.ok) {
        return []; // إرجاع مصفوفة فارغة إذا كانت الاستجابة غير ناجحة.
    }

    // تحويل الاستجابة إلى كائن JSON وإرجاعه.
    return res.json() as Promise<Workspace[]>; // إرجاع كائن JSON مع توضيح النوع كـ Workspace[].
}
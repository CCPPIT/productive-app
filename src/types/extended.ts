import { UserPermission, Workspace } from "@prisma/client";
export interface SubscriptionUser{
    userRole:UserPermission,
    user:{
        id:string,
        image?:string|null,
        username:string
    }
}
export interface HomePageImage{
    src:string;
    alt:string;
}
// تعريف واجهة UserActiveItemList
export interface UserActiveItemList {
    // id: معرف فريد للمستخدم، من النوع سلسلة نصية
    id: string;

    // username: اسم المستخدم، من النوع سلسلة نصية
    username: string;

    // image: رابط الصورة الشخصية للمستخدم، يمكن أن تكون سلسلة نصية أو null إذا لم يوجد صورة
    image: string | null;

    // userRole: تمثل دور المستخدم، من النوع UserPermission (يفترض أن هذه الواجهة أو النوع معرف في مكان آخر)
    userRole: UserPermission;
}
// تعريف نوع مخصص يمثل أنواع العناصر المعينة
export type AssignedItemType = "task" | "mindMap"; // يمكن أن تكون القيمة إما "task" أو "mindMap"

// واجهة تمثل معلومات المستخدم
export interface UserInfo {
    id: string; // معرف فريد للمستخدم
    username: string; // اسم المستخدم
    surname?: string | null; // لقب المستخدم (اختياري، يمكن أن يكون null)
    image?: string | null; // صورة المستخدم (اختياري، يمكن أن يكون null)
    name?: string | null; // الاسم الكامل للمستخدم (اختياري، يمكن أن يكون null)
}

// واجهة تمثل عنصر معين للمستخدم
export interface AssignedToMeDataItem {
    id: string; // معرف فريد للعنصر المعين
    title: string; // عنوان العنصر
    emoji: string; // رمز تعبيري مرتبط بالعنصر
    link: string; // رابط يتعلق بالعنصر
    workspaceName: string; // اسم مساحة العمل التي ينتمي إليها العنصر
    createdAt: Date; // تاريخ إنشاء العنصر
    type: AssignedItemType; // نوع العنصر (يجب أن يكون إما "task" أو "mindMap")
    update: {
        at: Date; // تاريخ آخر تحديث للعنصر
        by?: UserInfo | null; // المستخدم الذي قام بآخر تحديث (اختياري، يمكن أن يكون null)
    };
    workspaceId: string; // معرف مساحة العمل التي ينتمي إليها العنصر
    starred: boolean; // حالة توضح إذا كان العنصر مميزًا (true أو false)
}
// واجهة تمثل النشاطات الأخيرة في الصفحة الرئيسية
export interface HomeRecentActivity extends AssignedToMeDataItem {
    starred: boolean; // حالة توضح إذا كان النشاط مميزًا (true أو false)
}
export interface SettingsWorkspace extends Workspace{
    subscribers:SubscriptionUser[]
    

} 
// تعريف واجهة ShortTask التي تمثل هيكل المهمة المختصرة.
export interface ShortTask {
    id: string; // معرف المهمة.
    title: string; // عنوان المهمة.
    emoji: string; // رمز تعبيري مرتبط بالمهمة.
}

// تعريف واجهة ShortMindMap التي تمثل هيكل خريطة العقل المختصرة.
export interface ShortMindMap {
    id: string; // معرف خريطة العقل.
    title: string; // عنوان خريطة العقل.
}

// تعريف واجهة WorkspaceShortcuts التي تمتد من واجهة Workspace.
// هذه الواجهة تحتوي على المهام وخرائط العقل الخاصة بمساحة العمل.
export interface WorkspaceShortcuts extends Workspace {
    tasks: ShortTask[]; // مصفوفة من المهام المختصرة.
    mindMaps: ShortMindMap[]; // مصفوفة من خرائط العقل المختصرة.
}
// تعريف واجهة UserActiveItemList التي تمثل هيكل بيانات المستخدم النشط.

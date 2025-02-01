"use client";
import { UserActiveItemList } from "@/types/extended";
import { UserPermission } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Rss } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { createContext, useContext } from "react";

interface UserActivityStatusProps{
    children:React.ReactNode
}
// تعريف واجهة UserActivityStatus
interface UserActivityStatus {
    // isLoading: حالة التحميل، تشير إلى ما إذا كانت البيانات قيد التحميل أم لا
    isLoading: boolean;
  
    // isError: حالة الخطأ، تشير إلى ما إذا كان هناك خطأ أثناء تحميل البيانات
    isError: boolean;
  
    // allUsers: قائمة بجميع المستخدمين النشطين، نوعه مصفوفة من UserActiveItemList
    allUsers: UserActiveItemList[];
  
    // allActiveUsers: قائمة بالمستخدمين النشطين فقط، نوعه مصفوفة من UserActiveItemList
    allActiveUsers: UserActiveItemList[];
  
    // allInactiveUsers: قائمة بالمستخدمين غير النشطين، نوعه مصفوفة من UserActiveItemList
    allInactiveUsers: UserActiveItemList[];
  
    // getActiveUsersRoleType: دالة تأخذ دور المستخدم وتعيد قائمة بالمستخدمين الذين لديهم هذا الدور
    getActiveUsersRoleType: (role: UserPermission) => UserActiveItemList[];
  
    // checkIfUserIsActive: دالة تأخذ معرف المستخدم وتتحقق مما إذا كان المستخدم نشطًا
    checkIfUserIsActive: (id: string) => boolean;
  
    // refetch: دالة لإعادة تحميل البيانات
    refetch: () => void;
  }
  export const UserActivityStatusContext=createContext<UserActivityStatus|null>(null)


export const UserActivityStatusProvider=({children}:UserActivityStatusProps)=>{
    const params = useParams(); // استخدام hook للحصول على معلمات URL.
    const session = useSession(); // استخدام hook للحصول على معلومات الجلسة الحالية.
    
    const workspaceId = params.workspace_id ? params.workspace_id : null; // استخراج معرف مساحة العمل من معلمات URL، أو تعيينه إلى null إذا لم يكن موجودًا.
    
    // استخدام useQuery لجلب بيانات المستخدمين بناءً على معرف مساحة العمل.
    const { data: users, isLoading, isError, refetch } = useQuery<UserActiveItemList[], Error>({
        queryFn: async () => { // تعريف دالة الاستعلام غير المتزامنة.
            const res = await fetch(`/api/users/get-users?workspaceId=${workspaceId}`); // إجراء طلب GET لجلب المستخدمين.
            
            // التحقق مما إذا كانت الاستجابة غير ناجحة.
            if (!res.ok) {
                const error = (await res.json()) as string; // الحصول على رسالة الخطأ من الاستجابة.
                throw new Error(error); // رمي خطأ جديد مع الرسالة المستلمة.
            }
    
            const response = await res.json(); // تحويل الاستجابة إلى كائن JSON.
            return response; // إرجاع البيانات.
        },
        enabled: !!workspaceId, // تمكين الاستعلام فقط إذا كان workspaceId موجودًا.
        queryKey: ['getUserActivityStatus', workspaceId] // تحديد مفتاح الاستعلام لتخزين البيانات في الكاش.
    });
    const info:UserActivityStatus={
        isLoading,
        isError,
        allUsers:users??[],
        allActiveUsers:false,
        allInactiveUsers:false,
        getActiveUsersRoleType:false,
        checkIfUserIsActive:false,
        refetch
    }
    return(
        <UserActivityStatusContext.Provider value={info}>
            {children}
        </UserActivityStatusContext.Provider>
    )

}
export const UserActivityStatus=()=>{
    const context=useContext(UserActivityStatusContext);
    if(!context)throw new Error("Invalid use of UserActivityStatus.Ensure the component is wrapped in UserActivityStatusProvider.");
    return context;
}
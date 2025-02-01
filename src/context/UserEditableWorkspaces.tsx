"use client" // تستخدم للإشارة إلى أن هذا الكود سيعمل في بيئة العميل (المتصفح) وليس على الخادم.

import { Workspace } from "@prisma/client" // استيراد نوع Workspace من مكتبة Prisma، والذي يمثل هيكل البيانات الخاص بمكان العمل.
import { useQuery, UseQueryResult } from "@tanstack/react-query" // استيراد الدوال اللازمة من React Query لإجراء الاستعلامات.
import { useSession } from "next-auth/react" // استيراد hook لإدارة الجلسات من مكتبة Next Auth.
import { createContext, useContext } from "react" // استيراد الوظائف لإنشاء واستخدام السياقات في React.

interface Props {
    children: React.ReactNode // تعريف واجهة Props التي تحتوي على خاصية children من نوع React.ReactNode.
}

// إنشاء سياق جديد لإدارة Workspaces القابلة للتحرير بواسطة المستخدمين. 
export const UserEditableWorkspacesCtx = createContext<UseQueryResult<Workspace[], Error> | null>(null);

// إنشاء موفر للسياق، والذي سيقوم بتغليف الأطفال وتوفير البيانات الخاصة بمكان العمل.
export const UserEditableWorkspacesProvider = ({ children }: Props) => {
    const { data } = useSession(); // الحصول على بيانات الجلسة الحالية.
    
    // إجراء استعلام باستخدام React Query للحصول على أماكن العمل القابلة للتحرير.
    const queryData = useQuery<Workspace[], Error>({
        queryFn: async () => {
            const userId = data?.user.id; // استخراج معرف المستخدم من بيانات الجلسة.
            
            // إجراء طلب GET للحصول على أماكن العمل القابلة للتحرير.
            const res = await fetch(
                `/api/workspace/get/user_editable_workspaces?userId=${userId}` // استدعاء API.
            );

            // التحقق مما إذا كانت الاستجابة غير ناجحة.
            if (!res.ok) {
                const error = (await res.json()) as string; // الحصول على نص الخطأ من الاستجابة.
                throw new Error(error); // إلقاء خطأ جديد مع رسالة الخطأ.
            }

            const response = await res.json(); // تحويل الاستجابة إلى JSON.
            return response; // إرجاع الاستجابة.
        },
        enabled: !!data?.user.id, // تمكين الاستعلام فقط إذا كان معرف المستخدم متوفرًا.
        queryKey: ['getEditableWorkspaces', data?.user.id] // تحديد مفتاح الاستعلام.
    });

    // توفير البيانات المستخرجة من الاستعلام عبر السياق.
    return (
        <UserEditableWorkspacesCtx.Provider value={queryData}>
            {children}
        </UserEditableWorkspacesCtx.Provider>
    );
}

// إنشاء hook مخصص لاستخدام السياق في مكونات أخرى.
export const useUserEditableWorkspaces = () => {
    const ctx = useContext(UserEditableWorkspacesCtx); // الحصول على سياق UserEditableWorkspacesCtx.
    
    // التحقق مما إذا كان السياق موجودًا.
    if (!ctx) throw new Error("invalid use"); // إلقاء خطأ إذا تم استخدام hook في مكان غير صحيح.
    
    return ctx; // إرجاع السياق.
}
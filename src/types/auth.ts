import type{ User } from "next-auth";

 {/**
        هنا، تقوم بتعريف واجهة جديدة (أو توسيع الموجودة) تسمى JWT.
الخصائص:
id: خاصية مطلوبة من نوع string.
username: خاصية اختيارية يمكن أن تكون من نوع string أو null.
surname: خاصية اختيارية يمكن أن تكون من نوع string أو null.
completedOnboarding: خاصية اختيارية من نوع boolean.  */}

declare module "next-auth/jwt"{

    interface JWT{
        id:string;
        username?:string|null;
        surname?:string|null;
        completedOnboarding?:boolean
    }
}
// إعلان وحدة جديدة لـ "next-auth"
declare module "next-auth" {
    // توسيع واجهة Session
    interface Session {
        // تعريف خاصية user التي تمثل معلومات المستخدم
        user: User & {
            // معرف المستخدم (مطلوب)
            id: string;
            // اسم المستخدم (اختياري، يمكن أن يكون null)
            username?: string | null;
            // حالة إكمال onboarding (مطلوب)
            completedOnboarding: boolean;
            // اللقب (اختياري، يمكن أن يكون null)
            surname?: string | null;
        }
    }
}

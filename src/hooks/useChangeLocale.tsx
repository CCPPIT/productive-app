"use client"

import { useState, useTransition } from "react"
import  { usePathname, useRouter  } from "../i18n/routing";
// import { usePathname, useRouter } from "next/navigation";



// دالة useChangeLocale لتغيير اللغة
export const useChangeLocale = () => {
    // حالة للتحكم في تحميل اللغة
    const [isLoading, setIsLoading] = useState(false);
    
    // حالة للتحقق من الانتقال
    const [isPending, startTransition] = useTransition();
    
    // الحصول على كائن router
    const router = useRouter();
    
    // الحصول على مسار الصفحة الحالي
    const pathname = usePathname();
    
    // دالة للتعامل مع تغيير اللغة
    const onSelectChange = (nextLocale: 'ar' | 'en' ) => {
        setIsLoading(true); // تعيين حالة التحميل إلى true
        startTransition(() => {
            // استبدال عنوان URL الحالي باللغة الجديدة
            router.replace(pathname, { locale: nextLocale });
        });
    };
    
    // إرجاع الحالات والدالة للتعامل معها
    return { isLoading, isPending, onSelectChange };
};
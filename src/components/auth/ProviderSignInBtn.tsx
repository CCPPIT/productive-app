"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { useLocale } from 'next-intl';
import {signIn}from "next-auth/react"
import { useProviderLoginError } from '@/hooks/useProviderLoginError';
interface Props  extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children:React.ReactNode;
    providerName:'google'|'github';
    onLoading:React.Dispatch<React.SetStateAction<boolean>>
}

const ProviderSignInBtn = ({children,providerName,onLoading,...props}: Props) => {
   // استخدام hook لإدارة حالة "عرض معلومات تسجيل الدخول"
const [showLoggedInfo, setShowLoggedInfo] = useState(false);

// الحصول على اللغة الحالية من hook useLocale
const locale = useLocale();

// استدعاء دالة لمعالجة الأخطاء المتعلقة بتسجيل الدخول
useProviderLoginError(showLoggedInfo);

// دالة لمعالجة تسجيل الدخول
const signHandler = async () => {
    // تعيين حالة التحميل إلى true لبدء عملية تسجيل الدخول
    onLoading(true);
    
    // تعيين حالة عرض معلومات تسجيل الدخول إلى true
    setShowLoggedInfo(true);
    
    try {
        // محاولة تسجيل الدخول باستخدام مزود معين مع إعادة توجيه إلى صفحة onboarding
        await signIn(providerName, { callbackUrl: `/${locale}/onboarding` });
    } catch {
        // هنا يمكن التعامل مع الأخطاء إذا فشلت عملية تسجيل الدخول
        // (لم يتم تحديد أي إجراء هنا)
    }
    
    // تعيين حالة التحميل إلى false بعد الانتهاء من العملية
    onLoading(false);
};
  return (
   <Button
   onClick={signHandler}
   {...props}
    >
    {children}
   </Button>
  )
}

export default ProviderSignInBtn
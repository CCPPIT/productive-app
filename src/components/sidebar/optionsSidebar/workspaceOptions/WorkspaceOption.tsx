"use client"
import ActiveLink from '@/components/ui/active-link';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
    workspaceId: string; // معرف مساحة العمل (نص)
    children: React.ReactNode; // العناصر الفرعية للمكون
    defaultName: string; // الاسم الافتراضي (نص)
    href: string; // رابط (نص)
    fields: {
        title: string; // عنوان (نص)
        id: string; // معرف (نص)
        emoji?: string; // رمز تعبيري (اختياري)
    }[]; // مصفوفة من الكائنات تحتوي على العناوين والمعرفات والرموز التعبيرية
};

export const WorkspaceOption = ({children,defaultName,fields,href,workspaceId}: Props) => {
    const [isopen,setIsOpen]=useState(false);
    const onIsOpen=()=>{
        setIsOpen(!isopen)
    }
  return (
    <div>
        <Button
        onClick={onIsOpen}
        variant={"ghost"}
        size={"sm"}
        className='w-full justify-between'
        disabled={!fields}

        >
            <div className='flex items-center gap-2'>
                {children}


            </div>
            <ChevronDown 
            className={`trasition-all duration-200 ${
                isopen? "rotate-180":""
            }`}
            />
            {/*/إنشاء عنصر div يحتوي على مجموعة من الروابط النشطة*/}
<div className='ml-4 text-sm my-1 flex flex-col gap-1'>
    {/* التحقق مما إذا كانت fields موجودة و isopen مفتوح */}
    {fields && isopen && 
        // إذا كانت الشروط صحيحة، نقوم بتكرار العناصر في fields
        fields.map((field, i) => {
            // تقليم عنوان الحقل إذا كان أطول من 20 حرفًا
            const name = 
                field.title && field.title.length > 20
                ? field.title.substring(0, 19) + "..." // إذا كان العنوان طويلًا، نأخذ أول 19 حرفًا ونضيف "..."
                : field.title; // إذا لم يكن العنوان طويلًا، نستخدمه كما هو
            
            return (
                // عنصر ActiveLink لتمثيل رابط نشط
                <ActiveLink
                    key={i} // مفتاح فريد لكل عنصر في القائمة
                    href={`/dashboard/workspace/${workspaceId}/${href}/${field.id}`} // رابط الوجهة
                    variant={"ghost"} // نوع الرابط (variant)
                    size={"sm"} // حجم الرابط
                    className='w-full flex justify-start items-center gap-2 font-normal' // تنسيقات CSS
                >
                    {/* إذا كان هناك رمز تعبيري، نقوم بعرضه */}
                    {field.emoji && <span>{field.emoji}</span>}
                    {/* عرض العنوان أو الاسم الافتراضي إذا لم يكن هناك عنوان */}
                    <span>{field.title ? name : defaultName}</span>
                </ActiveLink>
            );
        })
    }
</div>

        </Button>
    </div>
  )
}
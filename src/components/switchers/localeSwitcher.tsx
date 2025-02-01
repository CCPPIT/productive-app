"use client"
import React from 'react'
import { HoverCard, HoverCardContent } from '../ui/hover-card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { useChangeLocale } from '@/hooks/useChangeLocale';
import { useLocale, useTranslations } from 'next-intl';
import { LoadingState } from '../ui/loadingState';
// تعريف واجهة Props لتحديد الخصائص المسموح بها في مكون معين

interface Props  {
    // خاصية variant تحدد نوع المكون، وهي اختيارية
    variant?:
    |"default" // الشكل الافتراضي
    |"destructive"// شكل يشير إلى إجراء مدمر
    | "outline" //  شكل ذو محيط
    |"secondary"//شكل ثانوي
    |"ghost" // شكل شفاف أو خفيف
    |"link"// شكل رابط
    | null; // يمكن أن تكون القيمة null
    // خاصية size تحدد حجم المكون، وهي اختيارية
     size?:
     | "default" // الحجم الافتراضي
     | "sm" // حجم صغير
     |"lg" // حجم كبير
     |"icon" // حجم مخصص للأيقونات
     |null ; // يمكن أن تكون القيمة null
     // خاصية alignHover تحدد كيفية محاذاة المكون عند التمرير عليه، وهي اختيارية
     alignHover?:
     | "center" // محاذاة إلى المركز
     | "start" // محاذاة إلى البداية
     | "end" // محاذاة إلى النهاية
     // خاصية alignDropdown تحدد كيفية محاذاة قائمة منسدلة، وهي اختيارية
     alignDropdown?:
     | "center" // محاذاة إلى المركز
     | "start" // محاذاة إلى البداية
     | "end" // محاذاة إلى النهاية
      // خاصية textSize تحدد حجم النص داخل المكون، وهي اختيارية
      textSize?:
      |"text-lg" // حجم نص كبير
      | "text-base" // حجم نص أساسي


}

const LocaleSwitcher = ({
    variant="default",
    size="default",
    alignHover="center",
    alignDropdown="center",
    textSize="text-base"
}: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {isLoading,isPending,onSelectChange}=useChangeLocale();
    const t=useTranslations("COMMON")
    const loacle=useLocale();
  return (
    <HoverCard openDelay={250} closeDelay={250}>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                disabled={isLoading}
                variant={variant}
                size={size}
                className={textSize}
                >
                    {isLoading?(
                        <LoadingState className='mr-0'/>

                    ):(
                        loacle.toLowerCase()

                    )}


                </Button>

            </DropdownMenuTrigger>
            <DropdownMenuContent align={alignDropdown}>
                <DropdownMenuItem
                onClick={()=>{
                    onSelectChange("ar")
                }}
                className='cursor-pointer'
                >
                    AR

                </DropdownMenuItem>
                <DropdownMenuItem
                onClick={()=>{
                    onSelectChange("en")
                }}
                className='cursor-pointer'
                >
                    EN

                </DropdownMenuItem>
                

            </DropdownMenuContent>
        </DropdownMenu>
        <HoverCardContent align={alignHover}>
            <span>{t("LANG_HOVER")}</span>


        </HoverCardContent>

    </HoverCard>
  )
}

export default LocaleSwitcher
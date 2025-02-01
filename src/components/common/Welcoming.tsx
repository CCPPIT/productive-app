/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { useFormatter, useTranslations } from 'next-intl';
import React from 'react'
// تعريف واجهة Props التي تستخدم خصائص HTMLDivElement مع إضافة خصائص إضافية
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  // خاصية hideOnMobile: متغير منطقي (boolean) لتحديد ما إذا كان يجب إخفاء العنصر على الأجهزة المحمولة
  hideOnMobile?: boolean;

  // خاصية hideOnDesktop: متغير منطقي (boolean) لتحديد ما إذا كان يجب إخفاء العنصر على أجهزة الكمبيوتر المكتبية
  hideOnDesktop?: boolean;

  // خاصية showOnlyOnPath: سلسلة نصية (string) لتحديد المسار الذي يجب أن يظهر فيه العنصر فقط
  showOnlyOnPath?: string;

  // خاصية usename: سلسلة نصية (string) تمثل اسم المستخدم، هذه الخصية مطلوبة
  username: string;

  // خاصية name: سلسلة نصية (string) تمثل الاسم، يمكن أن تكون اختيارية (optional) أو null
  name?: string | null;

  // خاصية surname: سلسلة نصية (string) تمثل اللقب، يمكن أن تكون اختيارية (optional) أو null
  surname?: string | null;
}

// Adjust the import based on your hooks

// تعريف مكون Welcoming باستخدام React.forwardRef
const Welcoming = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      className, // خاصية لتطبيق أنماط CSS
      hideOnMobile, // خاصية لتحديد الإخفاء على الأجهزة المحمولة
      hideOnDesktop, // خاصية لتحديد الإخفاء على الأجهزة المكتبية
      showOnlyOnPath, // خاصية لتحديد المسار الذي يجب أن يظهر فيه العنصر فقط
      username, // اسم المستخدم (يبدو أن هناك خطأ مطبعي هنا، يجب أن يكون username)
      name, // الاسم (اختياري)
      surname, // اللقب (اختياري)
      ...props // خصائص إضافية تنتقل إلى العنصر
    },
    ref // المرجع (ref) الذي يتم تمريره
  ) => {
    // استخدام hook للحصول على مسار الصفحة الحالي
    const pathname = usePathname();

    // استخدام hook لتنسيق البيانات
    const format = useFormatter();

    // الحصول على الوقت الحالي
    const dateTime = new Date();

    // استخدام hook لترجمة النصوص
    const t = useTranslations("COMMON");

    // تنسيق التاريخ
    const day = format.dateTime(dateTime, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    // تنسيق الوقت
    const time = format.dateTime(dateTime, {
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h24"
    });
    if(showOnlyOnPath && pathname !==showOnlyOnPath) return null;
    else{

    


    // هنا يمكن إضافة المزيد من المنطق أو JSX لعرض المحتوى
    return (
      <div
        ref={ref} // ربط المرجع بالعنصر
        className={cn(
          'space-y-1',
          hideOnDesktop?"lg:hidden":"",
          hideOnMobile?"md:block":"",
          className
        )} // تطبيق أنماط CSS
        {...props} // تمرير الخصائص الإضافية
       
      >
        {/* عرض محتوى الترحيب */}
        <p className='font-bold sm:text-3xl text-2xl'>
          {t("WELCOMEBACK")},{" "}
          <span>
            {name?
            name&& surname
          ? `${name}${surname}`
          :name
          :username}
          </span> {" "}
          👋
        </p>
        <p className='text-muted-foreground max-w-sm sm:max-w-xl'>
  {/* 
    هنا نستخدم التعبير التالي لتحويل الحرف الأول من قيمة المتغير day إلى حرف كبير 
    وتنسيق بقية السلسلة.
  */}
  {day[0].toUpperCase() + day.slice(1)}
</p>
    
     
      </div>
    );
  }
  }
);
Welcoming.displayName="Welcoming"


export default Welcoming;

  
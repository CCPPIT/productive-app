/* eslint-disable @typescript-eslint/no-unused-vars */

import { cn } from '@/lib/utils';
import React from 'react'
import { OpenSidebar } from './OpenSidebar';
import { getAuthSession } from '@/lib/auth';
import Welcoming from '../common/Welcoming';
import { BackBtn } from './BackBtn';
import { SavingStatus } from './SavingStatus';
import { User } from './User';
import { Breadcrumb } from '../ui/breadcrumb';
import { NotificationContainer } from '../notifications/NotificationContainer';
import { BreadcrumbNav } from './BreadcrumbNav';

// تعريف نوع Props، وهو نوع يستخدم في مكونات React
type Props = {
    // خاصية addManualRoutes: مصفوفة من كائنات تحتوي على معلومات حول المسارات اليدوية
    addManualRoutes?: {
        name: string; // اسم المسار
        href: string; // الرابط (URL) للمسار
        useTranslate?: boolean; // خيار لتحديد ما إذا كان يجب ترجمة الاسم
        emoji?: string;
    }[];

    // خاصية className: سلسلة نصية (string) تستخدم لتطبيق أنماط CSS
    className?: string;

    // خاصية children: تمثل محتوى المكون، يمكن أن تكون أي عنصر React
    children?: React.ReactNode;

    // خاصية workspaceHref: سلسلة نصية (string) تمثل رابط مساحة العمل
    workspaceHref?: string;

    // خاصية hideBreadCrumb: متغير منطقي (boolean) لتحديد ما إذا كان يجب إخفاء شريط الخبز (Breadcrumb)
    hideBreadCrumb?: boolean;

    // خاصية showingSavingStatus: متغير منطقي (boolean) لتحديد ما إذا كان يجب عرض حالة الحفظ
    showingSavingStatus?: boolean;

    // خاصية showBackBtn: متغير منطقي (boolean) لتحديد ما إذا كان يجب عرض زر العودة
    showBackBtn?: boolean;
};

export const DashboardHeader =async ({
    addManualRoutes,
    className,
    children,
    workspaceHref,
    hideBreadCrumb,
    showingSavingStatus,
    showBackBtn
}: Props) => {
    const session=await getAuthSession();
    if(!session)return null

   
  return (
    <header
    className={cn(
        "flex w-full  justify-between items-center mb-4 py-2 gap-2",
        className
    )}
    >
        <div className='flex items-center gap-2'>
           <OpenSidebar/>
           <Welcoming
           hideOnMobile
           hideOnDesktop
          username={session.user.username!}
           name={session.user.name}
           surname={session.user.surname}
           showOnlyOnPath='/dashboard'
           />
           {showBackBtn&&<BackBtn/>}
           {showingSavingStatus&&<SavingStatus/>}
           {!hideBreadCrumb &&(
            <BreadcrumbNav addManualRoutes={addManualRoutes}
            workspaceHref={workspaceHref}
            />
           )}

        </div>
        <div className='flex items-center gap-1 sm:gap-2'>
            <div className='flex flex-wrap items-center gap-0.5 sm:gap-1'>
                {children}
                <NotificationContainer/>

            </div>
            <User 
             username={session.user.username!}
            email={session.user.email!}
            profileImage={session.user.image}
           
            
            
            />

        </div>

    </header>
  )
}
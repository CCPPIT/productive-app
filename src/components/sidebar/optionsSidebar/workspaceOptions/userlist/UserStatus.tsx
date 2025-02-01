"use client";
import { UserAvatar } from '@/components/ui/user-avatar';
import { useTruncateText } from '@/hooks/useTruncateText';
import React from 'react'

// تعريف نوع بيانات Props
type Props = {
    // رابط الصورة، يمكن أن يكون نصاً أو null إذا لم يكن هناك صورة
    image: string | null; 
    
    // اسم المستخدم، يجب أن يكون نصاً (string)
    username: string; 
    
    // الحد الأقصى لعدد الأحرف للنص، وهو اختياري (يمكن أن يكون undefined)
    maxText?: number; 
    
    // حالة النشاط، وهي اختياري أيضاً (boolean)
    active?: boolean; 
};

export const UserStatus = ({image,username,maxText,active}: Props) => {
    const name=useTruncateText(username,maxText!);
  return (
    <div
    className={`flex items-center bg-background gap-2 hover:bg-accent rounded-sm px-2 py-1 duration-200 transition-colors ${
        !active ?"opacity-50":""
    }`}
    >
        <div className='relative'>
            <UserAvatar 
            profileImage={image}
            size={14}
            />
            {active&&(
                <div className='absolute bottom-0 right-0 w-3 h-3 rounded-full border-border shadow-sm border-2 bg-primary'>

                </div>
            )}
        </div>
        <p className='text-primary text-sm sm:text-base break-words'>{name}</p>
    </div>
  )
}
"use client";

import { useFormatter, useTranslations } from 'next-intl';
import React from 'react'
import dayjs from "dayjs"
import { Button } from '../ui/button';

type Props = {
    monthIndex: number; // مؤشر الشهر (رقم)
    onResetMonthHandler: () => void; // دالة لإعادة تعيين الشهر
    onChangeMonthHandler: (change: "next" | "prev") => void; // دالة لتغيير الشهر (التالي أو السابق)
};

export const CalendarHeader = ({monthIndex,onResetMonthHandler,onChangeMonthHandler}: Props) => {
    const t=useTranslations("CALENDAR.HEADER")
    const format = useFormatter(); // استدعاء دالة تنسيق التاريخ
    const dateTime = new Date(dayjs().year(), monthIndex); // إنشاء كائن تاريخ باستخدام السنة الحالية ومؤشر الشهر
    
    const year = format.dateTime(dateTime, {
        year: "numeric" // تنسيق السنة كرقم
    });
    
    const month = format.dateTime(dateTime, {
        month: "long" // تنسيق الشهر كاسم طويل
    });
  return (
    <div className='w-full flex flex-col sm:flex-row justify-between items-center'>
        <h1 className='text-xl sm:text-2xl md:text-3xl mb-4 md:mb-0'>
            <span className='font-bold'>{month}</span><span>{year}</span>
        </h1>
        <div>
            <Button
            className='rounded-e-none px-2 py-1 h-8 sm:h-10 sm:px-4 sm:py-2'
            variant={"outline"}
            onClick={()=>{
                onChangeMonthHandler("prev")
            }}
            >
                {t("PREV")}
            </Button>
            <Button
            className='rounded-e-none px-2 py-1 h-8 sm:h-10 sm:px-4 sm:py-2'
            variant={"outline"}
            onClick={
             onResetMonthHandler
            }
            >
                {t("TODAY")}
            </Button>
            <Button
            className='rounded-e-none px-2 py-1 h-8 sm:h-10 sm:px-4 sm:py-2'
            variant={"outline"}
            onClick={()=>{
                onChangeMonthHandler("next")
            }}
            >
                {t("NEXT")}
            </Button>
        </div>
    </div>
  )
}
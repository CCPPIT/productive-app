/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { HomeRecentActivity } from '@/types/extended'
import { useIntersection } from '@mantine/hooks';
import React, { useRef, useState } from 'react'

// تعريف نوع Props باستخدام TypeScript
type Props = {
  userId: string; // معرف المستخدم، يجب أن يكون من نوع سلسلة نصية
  initialData: HomeRecentActivity[]; // بيانات النشاطات الأخيرة، مصفوفة من الكائنات من نوع HomeRecentActivity
};

export const HomeRecentActivityContainer = ({userId,initialData}: Props) => {
  // تعريف حالة جديدة باستخدام useState
const [isAllFetched, setAllFetched] = useState(false);
// تعريف مرجع باستخدام useRef
const lastActivityItem = useRef<HTMLDivElement | null>(null);

// استخدام useIntersection لمراقبة تقاطع عنصر
const { entry, ref } = useIntersection({
  root: lastActivityItem.current, // العنصر الجذري لمراقبة التقاطع
  threshold: 1 // نسبة التقاطع المطلوبة
});

  return (
    <div>HomeRecentActivityContainer</div>
  )
}
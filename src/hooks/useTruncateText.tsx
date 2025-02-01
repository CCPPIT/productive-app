"use client"; // إشارة إلى أن هذا الكود يجب تنفيذه في جانب العميل (client-side)

import { useMediaQuery } from "@react-hook/media-query"; // استيراد hook للتحقق من استعلامات الوسائط

// تعريف دالة useTruncateText لتقليص النص
export const useTruncateText = (text: string, maxLength: number) => {
  // استخدام useMediaQuery للتحقق مما إذا كان العرض أقل من 640 بكسل
  const isSmallScreen = useMediaQuery(`(max-width: 640px)`);

  // تحديد الطول الأقصى بناءً على حجم الشاشة
  const length = isSmallScreen ? maxLength - 5 : maxLength;

  // إذا كان طول النص أقل أو يساوي الطول المحدد، نعيد النص كما هو
  if (text.length <= length) {
    return text;
  } else {
    // إذا كان النص أطول، نعيد جزءًا منه مع إضافة "..." في النهاية
    return text.slice(0, length) + "...";
  }
};
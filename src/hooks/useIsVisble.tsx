import { useEffect, useRef, useState } from "react"
import{useIntersection}from "@mantine/hooks"



// تعريف hook مخصص للتحقق من رؤية عنصر في الشاشة
export const useIsVisible = () => {
  // إنشاء مرجع لتخزين العنصر
  const item = useRef<HTMLElement | null>(null);
  // حالة لتخزين ما إذا كان العنصر مرئيًا أم لا
  const [isVisible, setIsVisible] = useState(false);

  // استخدام useIntersection لمراقبة تقاطع العنصر مع النافذة
  const { entry, ref } = useIntersection({
    root: item.current, // عنصر الجذر (null يعني نافذة العرض)
    threshold: 1 // يتطلب أن يكون العنصر مرئيًا بالكامل
  });

  // استخدام useEffect لمراقبة تغيرات entry
  useEffect(() => {
    // إذا كان العنصر مرئيًا، يتم تحديث الحالة
    if (entry?.isIntersecting) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [entry]);

  // إعادة الحالة والمرجع
  return { isVisible, ref };
};
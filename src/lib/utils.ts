import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// تعريف دالة scrollToHash التي تأخذ معلمة elementId من نوع string
export const scrollToHash = (elementId: string) => {
  // الحصول على العنصر من DOM باستخدام المعرف (ID) المقدم
  const element = document.getElementById(elementId);

  // إذا كان العنصر موجودًا، قم بإجراء التمرير
  element?.scrollIntoView({
    // تحديد سلوك التمرير ليكون سلسًا
    behavior: 'smooth',
    // تحديد موضع العنصر ليكون في منتصف الشاشة عند التمرير
    block: 'center',
    // تحديد وضع العنصر ليكون قريبًا من أقرب موضع
    inline: 'nearest'
  });
}

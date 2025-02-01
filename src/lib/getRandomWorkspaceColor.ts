// استيراد CustomColors من مكتبة Prisma
import { CustomColors } from "@prisma/client";

// استخراج قيم CustomColors وتحويلها إلى مصفوفة
export const colors = Object.values(CustomColors);
export const getRandomWorkspaceColor = () => {
    // استرجاع قيم CustomColors مرة أخرى
    const colors: string[] = Object.values(CustomColors);
    
    // حساب فهرس عشوائي من 0 إلى طول المصفوفة
    const randIndex = Math.floor(Math.random() * colors.length);
    
    // إرجاع اللون العشوائي
    return colors[randIndex] as CustomColors;
}
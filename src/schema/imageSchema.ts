// استيراد مكتبة zod التي تستخدم لإنشاء مخططات التحقق من البيانات
import { z } from "zod";

// تعيين الحد الأقصى لحجم الملف إلى 400,000 بايت (حوالي 400 كيلوبايت)
export const MAX_FILE_SIZE = 400000;

// تعريف أنواع الصور المقبولة في مصفوفة
export const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',  // نوع صورة JPEG
    'image/jpg',   // نوع صورة JPG
    'image/png',   // نوع صورة PNG
    'image/webp',  // نوع صورة WEBP
];

// إنشاء مخطط للتحقق من صحة الصور باستخدام مكتبة zod
export const imageSchema = z.object({
    // تعريف خاصية 'image' التي يمكن أن تكون أي نوع (نوع غير محدد) وتكون اختيارية
    image: z.any().optional()
        // التحقق من أن حجم الملف لا يتجاوز الحد الأقصى المحدد
        .refine((file) => file?.size <= MAX_FILE_SIZE, "SCHEMA.IMAGE.MAX")
        // التحقق من أن نوع الصورة من الأنواع المقبولة
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "SCHEMA.IMAGE.SUPPORTED"
        )
});

// استنتاج نوع البيانات من مخطط الصورة (imageSchema) وتخزينه في نوع جديد يسمى ImageSchema
export type ImageSchema = z.infer<typeof imageSchema>;
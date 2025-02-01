// استيراد مكتبة zod للتحقق من صحة البيانات
import { z } from "zod";

// تعريف كائن zod للتحقق من صحة البيانات لمعلومات المستخدم الإضافية
export const additionalUserInfoFirstPart = z.object({
    // تعريف خاصية name كـ string مع بعض الشروط
    name: z.string()
        // استخدام refine لإضافة شرط خاص للتحقق من أن الاسم يحتوي على أحرف وأرقام فقط
        .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
            // رسالة الخطأ التي ستظهر إذا لم يتم استيفاء الشرط
            message: "SCHEMA.USERNAME.SPECIAL_CHARS",
        })
        // جعل الخاصية اختيارية (يمكن أن تكون غير موجودة)
        .optional(),

    // تعريف خاصية surname كـ string مع نفس الشروط
    surname: z.string()
        // استخدام refine للتحقق من أن اللقب يحتوي على أحرف وأرقام فقط
        .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
            // رسالة الخطأ التي ستظهر إذا لم يتم استيفاء الشرط
            message: "SCHEMA.USERNAME.SPECIAL_CHARS",
        })
        // جعل الخاصية اختيارية
        .optional(),
});

// تعريف نوع TypeScript استنادًا إلى الكائن الذي تم تعريفه باستخدام zod
export type AdditionalUserInfoFirstPart = z.infer<typeof additionalUserInfoFirstPart>;
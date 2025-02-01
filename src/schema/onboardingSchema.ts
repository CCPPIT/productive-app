// استيراد مكتبة Zod للتحقق من البيانات
import { z } from "zod";

// تعريف مخطط التحقق للبيانات الخاصة بعملية الانضمام (onboarding)
export const onboardingSchema = z.object({
  // الحقل name: سلسلة نصية (string) يمكن أن تكون اختيارية (optional) أو null
  name: z.string().optional().nullable(),

  // الحقل surname: سلسلة نصية (string) يمكن أن تكون اختيارية (optional) أو null
  surname: z.string().optional().nullable(),

  // الحقل useCase: سلسلة نصية (string) يجب أن تكون إما "WORK" أو "STUDY" أو "PERSONAL_USE"
  useCase: z
    .string()
    .refine(
      (string) =>
        string === "WORK" || string === "STUDY" || string === "PERSONAL_USE"
    ),

  // الحقل workspaceName: سلسلة نصية (string) يجب أن تكون بطول 4 أحرف على الأقل 
  // ويجب أن تحتوي فقط على أحرف وأرقام
  workspaceName: z
    .string()
    .min(4) // الحد الأدنى لطول السلسلة 4 أحرف
    .refine((username) => /^[a-zA-Z0-9]+$/.test(username)), // التحقق من أن الاسم يحتوي على أحرف وأرقام فقط

  // الحقل workspaceImage: سلسلة نصية (string) يمكن أن تكون اختيارية (optional) أو null
  workspaceImage: z.string().optional().nullable(),
});

// تعريف نوع البيانات (type) بناءً على مخطط التحقق
export type OnboardingSchema = z.infer<typeof onboardingSchema>;
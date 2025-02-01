// استيراد الدالة getToken من مكتبة next-auth/jwt لاستخراج توكن المستخدم
import { getToken } from "next-auth/jwt";

// استيراد الدالة createUploadthing وأنواع FileRouter من مكتبة uploadthing
import { createUploadthing, type FileRouter } from "uploadthing/next";

// إنشاء مثيل من createUploadthing
const f = createUploadthing();

// تعريف كائن ourFileRouter الذي يحتوي على طرق رفع الملفات
export const ourFileRouter = {
  // طريقة رفع الصور
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 2 } })
    // إضافة middleware للتحقق من توكن المستخدم
    .middleware(async (req) => {
      const user = await getToken(req); // استخراج توكن المستخدم من الطلب
      if (!user) throw new Error("Unauthorized"); // إذا لم يكن هناك مستخدم، رمي خطأ
      return { userId: user.id }; // إرجاع معرف المستخدم
    })
    // دالة تُستدعى عند اكتمال رفع الملف
    .onUploadComplete(async () => {
      // يمكن تنفيذ كود هنا بعد اكتمال الرفع
    }),

  // طريقة رفع الملفات إلى الدردشة
  addToChatFile: f({
    // إعدادات رفع الملفات: الحد الأقصى لحجم الملفات وعدد الملفات المسموح بها
    pdf: { maxFileSize: "32MB", maxFileCount: 5 },
    image: { maxFileSize: "16MB", maxFileCount: 5 },
  })
    // إضافة middleware للتحقق من توكن المستخدم
    .middleware(async (req) => {
      const user = await getToken(req); // استخراج توكن المستخدم من الطلب
      if (!user) throw new Error("Unauthorized"); // إذا لم يكن هناك مستخدم، رمي خطأ
      return { userId: user.id }; // إرجاع معرف المستخدم
    })
    // دالة تُستدعى عند اكتمال رفع الملف
    .onUploadComplete(async () => {
      // يمكن تنفيذ كود هنا بعد اكتمال الرفع
    }),
} satisfies FileRouter; // التحقق من أن ourFileRouter يتوافق مع نوع FileRouter

// تعريف نوع OurFileRouter بناءً على ourFileRouter
export type OurFileRouter = typeof ourFileRouter;
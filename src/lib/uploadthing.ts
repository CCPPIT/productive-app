// استيراد الدالة generateReactHelpers من مكتبة @uploadthing/react
import { generateReactHelpers } from "@uploadthing/react";

// استيراد نوع OurFileRouter الذي يمثل مسارات رفع الملفات
import type { OurFileRouter } from "@/app/api/uploadthing/core";

// استيراد الدالة generateUploadButton من مكتبة @uploadthing/react
import { generateUploadButton } from "@uploadthing/react";

// إنشاء أدوات React الخاصة برفع الملفات باستخدام OurFileRouter
// يتم هنا استخدام الدالة generateReactHelpers لإنشاء دوال مفيدة مثل useUploadThing و uploadFiles
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();

// إنشاء زر رفع الملفات باستخدام الدالة generateUploadButton
// يتم تمرير OurFileRouter كنوع للتأكد من التوافق مع المسارات المحددة
export const UploadButton = generateUploadButton<OurFileRouter>();
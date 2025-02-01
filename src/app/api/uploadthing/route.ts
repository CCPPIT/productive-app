// استيراد دالة createRouteHandler من مكتبة uploadthing
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// استيراد ourFileRuter من الملف المحلي core

// إنشاء معالجات للطرق GET و POST باستخدام createRouteHandler
export const { GET, POST } = createRouteHandler({
    router: ourFileRouter// تمرير ourFileRuter كجهاز توجيه
});
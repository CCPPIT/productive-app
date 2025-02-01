/* eslint-disable @typescript-eslint/no-explicit-any */
// استيراد الدوال اللازمة من المكتبات
import createMiddleware from "next-intl/middleware"; // استيراد دالة لإنشاء Middleware للتدويل
import { withAuth } from "next-auth/middleware"; // استيراد دالة Middleware للتحقق من الهوية
import { NextRequest } from "next/server"; // استيراد نوع NextRequest من Next.js
import { routing } from "./i18n/routing";

// تعريف اللغات المدعومة
const locales = ["ar", "en",]; // "te" للتيلوغو و "en" للإنجليزية

// تعريف الصفحات العامة التي يمكن الوصول إليها بدون تسجيل دخول
const publicPages = ["/", "/sign-in", "/sign-up"]; // الصفحات العامة

// إنشاء Middleware للتدويل باستخدام اللغات المدعومة
const intlMiddleware = createMiddleware(
 routing, // تعيين اللغة الافتراضية إلى الإنجليزية
);

// إنشاء Middleware للتحقق من الهوية
const authMiddleware = withAuth(
  function onSuccess(req) {
    // إذا تم التحقق من الهوية بنجاح، يتم استدعاء intlMiddleware
    return intlMiddleware(req);
  },
  {
    callbacks: {
      // التحقق مما إذا كان المستخدم مخولًا
      authorized: ({ token }) => token !== null, // إذا كان هناك رمز، فالمستخدم مخول
    },
    pages: {
      signIn: "/login", // تحديد صفحة تسجيل الدخول
    },
  }
);

// الوظيفة الرئيسية للـ Middleware
export default function middleware(req: NextRequest) {
  // إنشاء تعبير عادي للتحقق من الصفحات العامة
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages.join("|")})?/?$`, // بناء التعبير العادي
    "i" // "i" لجعل التحسس للحالة غير مهم
  );

  // التحقق مما إذا كانت الصفحة عامة
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  // إذا كانت الصفحة عامة، استخدم intlMiddleware
  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    // إذا لم تكن عامة، استخدم authMiddleware
    return (authMiddleware as any)(req);
  }
}

// إعدادات Middleware لتحديد الصفحات التي سيطبق عليها
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // استبعاد صفحات API وملفات ثابتة من Middleware
};
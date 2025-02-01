/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Trash2, UploadCloud } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useRef, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

// تعريف نوع Props الذي يمثل الخصائص المستخدمة في مكون React أو TypeScript
type Props = {
    // خاصية form التي تمثل كائن استخدام النموذج العائد من مكتبة مثل React Hook Form
    form: UseFormReturn<any>,
    
    // خاصية schema التي تمثل مخطط Zod للتحقق من صحة البيانات
    schema: z.ZodObject<any>,
    
    // خاصية اختيارية onGetIamePreview التي تأخذ دالة تأخذ صورة كـ string وتعيدها
    onGetIamePreview?: (image: string) => void,
    
    // خاصية inputAccept تحدد أنواع الملفات المقبولة كإدخال
    inputAccept: "image/*" | "pdf",
    
    // خاصية اختيارية typesDescription لوصف أنواع الملفات المقبولة كمحتوى نصي
    typesDescription?: string,
    
    // خاصية اختيارية ContainerClassName لتحديد فئة CSS لحاوية المكون
    ContainerClassName?: string,
    
    // خاصية اختيارية LabelClassName لتحديد فئة CSS لعنصر التسمية
    LabelClassName?: string,
    
    // خاصية اختيارية LabelText لتحديد نص التسمية
    LabelText?: string,
    
    // خاصية اختيارية useAsBtn تحدد إذا كان يجب استخدام المكون كزر (boolean)
    useAsBtn?: boolean,
    
    // خاصية اختيارية hideFileName تحدد إذا كان يجب إخفاء اسم الملف (boolean)
    hideFileName?: boolean,
    
    // خاصية اختيارية btnText لتحديد نص الزر
    btnText?: string,
    
    // خاصية اختيارية btnSize لتحديد حجم الزر، يمكن أن يكون "default" أو "sm" أو "lg" أو "icon" أو null
    btnSize?: "default" | "sm" | "lg" | "icon" | null,
    
    // خاصية اختيارية btnVaraint لتحديد نوع الزر، يمكن أن يكون واحدًا من عدة خيارات
    btnVaraint?: 
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | "link"
        | null;
}

export const UploadFile = ({
    form,
    inputAccept,
    schema,
    ContainerClassName,
    LabelClassName,
    LabelText,
    btnSize,
    btnText,
    btnVaraint,
    hideFileName,
    onGetIamePreview,
    typesDescription,
    useAsBtn,


}: Props) => {
    // استيراد المخطط من ملف محلي
    
    const t = useTranslations("UPLOAD_FILE"); // استخدام الترجمة لملف التحميل
    const [dragActive, setDragActive] = useState(false); // حالة لتتبع النشاط في السحب والإفلات
    const [file, setFile] = useState<File | null>(null); // حالة لتخزين الملف
    const inputRef = useRef<HTMLInputElement | null>(null); // مرجع لحقل الإدخال
    
    const onFileHandler = (providerFile: File) => {
        // معالجة الملف المقدم
        const result = schema.pick({
            file: true // اختيار خصائص معينة للتحقق
        }).safeParse({ file: providerFile }) as z.SafeParseReturnType<
            {
                [x: string]: any
            },
            {
                [x: string]: any
            }
        >;
    
        if (result.success) {
            // إذا كانت عملية التحقق ناجحة
            form.clearErrors("file"); // مسح الأخطاء السابقة
            form.setValue("file", providerFile); // تعيين القيمة في النموذج
            setFile(providerFile); // تحديث حالة الملف
    
            // إذا كان هناك دالة لعرض المعاينة، استدعائها
            if (onGetIamePreview) {
                onGetIamePreview(URL.createObjectURL(providerFile)); // إنشاء رابط لمعاينة الملف
            }
        } else {
            // إذا فشلت عملية التحقق
            const errors = result.error.flatten().fieldErrors.file; // استرجاع الأخطاء
            errors?.forEach((error) => form.setError("file", { message: error })); // تعيين الأخطاء في النموذج
        }
    
        form.trigger("file"); // تشغيل التحقق من النموذج
    };
 // دالة handleChange للتعامل مع تغييرات الإدخال في حقل رفع الملفات
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; // الحصول على الملفات من حدث الإدخال
    if (files && files[0]) { // التحقق مما إذا كانت هناك ملفات
        onFileHandler(files[0]); // استدعاء دالة onFileHandler مع الملف الأول
    }
};
// دالة handleDrop للتعامل مع أحداث السحب والإفلات
const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // منع السلوك الافتراضي (مثل فتح الملف في المتصفح)
    e.stopPropagation(); // منع الحدث من الانتقال إلى عناصر أخرى
    setDragActive(false); // إيقاف حالة السحب النشط

    const files = e.dataTransfer.files; // الحصول على الملفات من حدث السحب
    if (files && files[0]) { // التحقق مما إذا كانت هناك ملفات
        onFileHandler(files[0]); // استدعاء دالة onFileHandler مع الملف الأول
    }
};
// دالة handleDragEnter للتعامل مع حدث دخول السحب
const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // منع السلوك الافتراضي
    e.stopPropagation(); // منع الحدث من الانتقال إلى عناصر أخرى
    setDragActive(true); // تعيين حالة السحب النشط
};
// دالة handleDragLeave للتعامل مع حدث مغادرة السحب
const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // منع السلوك الافتراضي
    e.stopPropagation(); // منع الحدث من الانتقال إلى عناصر أخرى
    setDragActive(false); // تعيين حالة السحب غير النشطة
};
// دالة handleDragOver للتعامل مع حدث السحب فوق المنطقة
const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // منع السلوك الافتراضي
    e.stopPropagation(); // منع الحدث من الانتقال إلى عناصر أخرى
    setDragActive(true); // تعيين حالة السحب النشط
};
// دالة removeFile لإزالة الملف المحدد
const removeFile = () => {
    setFile(null); // تعيين حالة الملف إلى null (إزالة الملف)
    form.setValue("file", null); // تعيين قيمة الملف في النموذج إلى null
    form.trigger("file"); // تشغيل التحقق من النموذج مجددًا
};
        
    
  return (
   <FormField
   control={form.control}
   name='file'
   render={({field})=>(
    <FormItem className='flex flex-col justify-center items-center'>
        {LabelText&&(
              <FormLabel className={LabelClassName}>{LabelText}</FormLabel>

        )}
        <FormControl>
            {useAsBtn?(
                <>
               
                <Button
                size={btnSize}
                variant={btnVaraint}
                type='button'
                onClick={() => {
                    if (inputRef.current) inputRef?.current.click(); // استدعاء حدث النقر على عنصر الإدخال
                }}
                className='dark:text-white'
                >
                    {btnText&&btnText}

                </Button>
                <Input
                {...field}
                placeholder='fileInput'
                type='file'
                accept={inputAccept}
                multiple={true}
                value={undefined}
                tabIndex={-1}
                onChange={handleChange}
                ref={inputRef}
                />
                </>

            ):(
                <div
                className={cn(
                    'foucs-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 p-4 sm:p-6 h-min-0 h-40 cursor-pointer hover:bg-muted/90 duration-200 transition-colors ring-offset-background rounded-md relative border-muted-foreground border border-dashed text-muted-foreground flex flex-col items-center w-[15rem] justify-center',
                    dragActive?"bg-primary/20"
                    :"bg-muted",
                    ContainerClassName
                )}
                onDragEnter={handleDragEnter}
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onClick={()=>{
                    if(inputRef.current)
                        inputRef?.current.click();
                }}
                onKeyDown={(e)=>{
                    if(e.key==="Enter"){
                        inputRef.current?.click()
                    }
                }}
                role='presentation'
                tabIndex={0}
                >
                 <Input
                  {...field}
                  placeholder="fileInput"
                  className="sr-only"
                  type="file"
                  multiple={true}
                  onChange={handleChange}
                  ref={inputRef}
                  value={undefined}
                  accept={inputAccept}
                />
                <UploadCloud size={30}/>
                <p className='text-sm font-semibold uppercase text-primary mt-5'>
                    {btnText ? btnText :t("UPLOAD")}
                </p>
                <p className='text-xs mt-1 text-center'>{typesDescription}</p>

                </div>

            )}
        </FormControl>
        <FormMessage/>
        {file && !hideFileName&&(
            <div className='flex items-center flex-row space-x-5 text-sm mt-6 text-center'>
                <p>{file.name}</p>
                <Button
                className='h-8 w-8 text-destructive hover:text-destructive'
                variant={"ghost"}
                size={"icon"}
                onClick={()=>removeFile}
                >
                    <Trash2 size={18}/>
                </Button>

            </div>
        )}
      
    </FormItem>
   )}
   />
  )
}
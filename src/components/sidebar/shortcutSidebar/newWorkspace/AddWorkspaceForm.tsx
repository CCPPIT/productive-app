/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { UploadFile } from '@/components/onboarding/common/UploadFile'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingState } from '@/components/ui/loadingState'
import { useToast } from '@/hooks/use-toast'
import { useUploadThing } from '@/lib/uploadthing'
import { imageSchema } from '@/schema/imageSchema'
import { ApiWorkspaceShema, workspaceSchema, WorkspaceSchema } from '@/schema/workspaceSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { on } from 'events'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import data from 'react-intl/locale-data/af'

type Props = {
    onSetOpen:React.Dispatch<React.SetStateAction<boolean>>
}

export const AddWorkspaceForm = ({onSetOpen}: Props) => {
  // استيراد المكتبات والأدوات اللازمة
const t = useTranslations("AUTH.NEW_WORKSPACE"); // استخدام الترجمة لنصوص واجهة المستخدم
const m = useTranslations("MESSAGES"); // استخدام الترجمة لنصوص الرسائل
const { toast } = useToast(); // استيراد دالة toast لعرض إشعارات
const [uploadError, setUploadError] = useState(false); // حالة لتتبع أخطاء التحميل

// إعداد نموذج باستخدام useForm
const form = useForm<WorkspaceSchema>({
    resolver: zodResolver(workspaceSchema), // استخدام Zod للتحقق من صحة البيانات
    defaultValues: {
        workspaceName: "" // تعيين القيمة الافتراضية لاسم مساحة العمل
    },
});

// إعداد دالة لـ useMutation لإنشاء مساحة عمل جديدة
const { mutate: newWorkspace, isPending } = useMutation({
    mutationFn: async (data: ApiWorkspaceShema) => {
        const { data: result } = await axios.post('/api/workspace/new', data); // إرسال طلب POST لإنشاء مساحة عمل جديدة
        return result; // إرجاع النتيجة
    },
    onError: (err: AxiosError) => {
        // التعامل مع الأخطاء عند حدوثها
        const error = err?.response?.data ? err.response.data : "ERRORS.DEFAULT";
        toast({
            title: m(error), // عرض رسالة الخطأ
            variant: "destructive" // تعيين نوع الإشعار
        });
    },
    onSuccess: () => {
        // التعامل عند نجاح العملية
        onSetOpen(false); // إغلاق النموذج أو النافذة
        toast({
            title: m("SUCCESS.NEW_WORKSPACE") // عرض رسالة نجاح
        });
    },
    mutationKey: ['newWorkspace'], // تعيين مفتاح فريد للعميلة
});

// إعداد دالة لتحميل الصور باستخدام useUploadThing
const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onUploadError() {
        // التعامل مع أخطاء التحميل
        setUploadError(true); // تعيين حالة الخطأ
        toast({
            title: m("ERRORS.WORKSPACE_ICON_ADDED"), // عرض رسالة الخطأ
            variant: "destructive" // تعيين نوع الإشعار
        });
    },
    onClientUploadComplete: (data) => {
        // التعامل عند اكتمال التحميل
        if (!data) {
            setUploadError(true); // تعيين حالة الخطأ
            toast({
                title: m("ERRORS.WORKSPACE_ICON_ADDED"), // عرض رسالة الخطأ
                variant: "destructive"
            });
        }
    }
});

// دالة عند تقديم النموذج
const onSubmit = async (data: WorkspaceSchema) => {
    setUploadError(false); // إعادة تعيين حالة الخطأ
    const image: File | undefined | null = data.file; // الحصول على الملف من البيانات
    let workspaceImageURL: null | string = null; // تعيين URL الصورة لمساحة العمل

    if (image) {
        // إذا كان هناك صورة، بدء التحميل
        const data = await startUpload([image]);
        if (data) workspaceImageURL = data[0].url; // الحصول على URL الصورة
    }

    if (uploadError) return; // إذا كان هناك خطأ، الخروج من الدالة
    newWorkspace({
        workspaceName: data.workspaceName, // إرسال اسم مساحة العمل
        file: workspaceImageURL // إرسال URL الصورة
    });
};
  return (
    <Form {...form}>
        <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='max-w-md w-full space-y-8'
        >
            <div className='space-y-1.5'>
                <FormField
                name='workspaceName'
                control={form.control}
                render={({field})=>(
                    <FormItem>
                        <FormLabel className='text-muted-foreground'> {t("INPUTS.NAME")}</FormLabel>
                        <FormControl>
                            <Input
                            className='bg-muted'
                            placeholder={t("PLACEHOLDERS.NAME")}
                            {...field}
                            />

                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
                />

            </div>
            <UploadFile
            form={form}
            inputAccept="image/*"
            typesDescription={t("IMAGE")}
            ContainerClassName='w-full'
            LabelClassName='text-muted-foreground mb-1.5 self-start'
            LabelText={t("INPUTS.FILE")}
            schema={workspaceSchema}

            />
            <Button
            disabled={!form.formState.isValid||isUploading||isPending}
            type='submit'
            className="w-full mt-10 max-w-md dark:text-white font-semibold"
            >
                {isUploading|| isPending?(
                    <LoadingState loadingText={t("BTN_PENDING")}/>

                ):(
                    t("BTN_ADD")

                )}


            </Button>

        </form>

    </Form>
  )
}
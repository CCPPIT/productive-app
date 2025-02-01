/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionType, useOnboardingForm } from '@/context/OnboardingForm'
import { additionalUserInfoFirstPart, AdditionalUserInfoFirstPart } from '@/schema/additionalUserInfoFirstPart'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AddUserImage } from '../common/AddUserImage'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

type Props = {
    profileImage?:string|null
}

const FirstStep = ({profileImage}: Props) => {
  // استدعاء hook useSession للحصول على معلومات الجلسة الحالية
const session = useSession();

// استدعاء hook useOnboardingForm للحصول على الحالة الحالية للنموذج
const { currentStep, name, surname, dispatch } = useOnboardingForm();

// إعداد نموذج باستخدام useForm مع التحقق من صحة البيانات باستخدام zod
const form = useForm<AdditionalUserInfoFirstPart>({
    // تحديد دالة resolver للتحقق من صحة البيانات باستخدام zod
    resolver: zodResolver(additionalUserInfoFirstPart),
    // تعيين القيم الافتراضية للنموذج
    defaultValues: {
        // تعيين الاسم إذا كان موجودًا، وإلا تعيينه كقيمة فارغة
        name: name ? name : "",
        // تعيين اللقب إذا كان موجودًا، وإلا تعيينه كقيمة فارغة
        surname: surname ? surname : "",
    },
});

// استدعاء hook useTranslations للحصول على دوال الترجمة للنموذج
const t = useTranslations("ONBOARDING_FORM");

// استخدام useEffect لتنفيذ تأثير جانبي عند تغيير صورة الملف الشخصي
useEffect(() => {
    // إرسال إجراء لتحديث صورة الملف الشخصي في حالة تغييرها
    dispatch({
        type: ActionType.PROFILEIMAGE,
        payload: profileImage as string | null | undefined,
    });
}, [profileImage, dispatch]); // يتتبع التغييرات في profileImage و dispatch

// دالة onSubmit التي تُنفذ عند تقديم النموذج
const onSubmit = (data: AdditionalUserInfoFirstPart) => {
    // إرسال إجراء لتحديث الاسم في الحالة
    dispatch({ type: ActionType.NAME, payload: data.name! });
    // إرسال إجراء لتحديث اللقب في الحالة
    dispatch({ type: ActionType.SURNAME, payload: data.surname! });
    // إرسال إجراء لتغيير الخطوة الحالية في عملية التسجيل
    dispatch({ type: ActionType.CHANGE_SITE, payload: currentStep + 1 });
};

  return (
    <>
    <h2 className='font-bold text-4xl md:text-5xl flex flex-col items-center my-10'>
    <span>{t("FIRST_STEP.TITLE.FIRST")}</span>
    <span>{t("FIRST_STEP.TITLE.SECOND")}</span>
    </h2>
    <div className='max-w-md w-full scpace-y-8'>
        <div className='w-full flex flex-col items-center justify-center gap-2'>
            <p>{t("FIRST_STEP.PHOTO")}</p>
            <AddUserImage profileImage={profileImage}/>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <div className='space-y-1.5'>
                    <FormField
                    control={form.control}
                    name='name'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel className='text-muted-foreground'>
                            {t("FIRST_STEP.INPUTS.NAME")}
                            </FormLabel>
                            <FormControl>
                                <Input
                                placeholder={t("FIRST_STEP.PLACEHOLDER.NAME")}
                                {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                     <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      {t("FIRST_STEP.INPUTS.SURNAME")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-muted"
                        placeholder={t("FIRST_STEP.PLACEHOLDER.SURNAME")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />

                </div>
                <Button className='w-full max-w-md dark:text-white font-semibold'>
                {t("NEXT_BTN")}
                <ArrowRight size={18}/>
                </Button>

            </form>

        </Form>

    </div>
    </>
  )
}

export default FirstStep
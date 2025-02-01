/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/components/ui/button'
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { User as UserType } from "@prisma/client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UserAvatar } from '@/components/ui/user-avatar'
import { useToast } from '@/hooks/use-toast'
import { useUploadThing } from '@/lib/uploadthing'
import { cn } from '@/lib/utils'
import { imageSchema, ImageSchema } from '@/schema/imageSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Camera, Check, Trash, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react';
import { LoadingState } from '@/components/ui/loadingState';

type Props = {
    profileImage?:string|null,
    className?:string
}

export const AddUserImage = ({profileImage,className}: Props) => {
    const router=useRouter();
    const [open, setOpen] = useState(false);

    const {toast}=useToast()
   
    const m = useTranslations("MESSAGES");
    const t = useTranslations("CHANGE_PROFILE_IMAGE");
    const tt = useTranslations("ONBOARDING_FORM");
    const {update}=useSession();
    const [imagePreview,setImagePriview]=useState("")
    const inputRef=useRef<HTMLInputElement|null>(null)
    const form=useForm<ImageSchema>({
        resolver:zodResolver(imageSchema),
    });
    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // التحقق مما إذا كان هناك ملفات تم اختيارها
        if (e.target.files && e.target.files[0]) {
            const selectFile = e.target.files[0]; // الحصول على الملف الأول من القائمة
            
            // التحقق من صحة الملف باستخدام schema
            const result = imageSchema.safeParse({ image: selectFile });
            
            if (result.success) {
                // إذا كان الملف صالحًا
                form.clearErrors("image"); // مسح أي أخطاء سابقة مرتبطة بالصورة
                form.setValue("image", selectFile); // تعيين القيمة في نموذج الإدخال
                setImagePriview(URL.createObjectURL(e.target.files[0])); // إنشاء URL مؤقت للعرض
            } else {
                // إذا كان هناك أخطاء في التحقق
                const errors = result.error.flatten().fieldErrors.image; // استخراج الأخطاء
                errors?.forEach((error) => form.setError("image", { message: error })); // تعيين الأخطاء في النموذج
            }
        }
    };
// استخدام useMemo لحفظ نتائج الحساب بناءً على تغيرات قيمتين: imagePreview و profileImage
const imageOptions = useMemo(() => {
    // إذا لم يكن هناك عرض للصورة (imagePreview) وكان هناك صورة شخصية (profileImage)
    if (!imagePreview && profileImage) {
        // إرجاع كائن يحتوي على إمكانية حذف الصورة لكن لا يمكن حفظها
        return {
            canDelete: true,  // يمكن حذف الصورة
            canSave: false    // لا يمكن حفظ الصورة
        };
    } 
    // إذا كان هناك عرض للصورة (imagePreview) وكان هناك أيضًا صورة شخصية (profileImage)
    else if (imagePreview && profileImage) {
        // إرجاع كائن يحتوي على إمكانية حفظ الصورة لكن لا يمكن حذفها
        return {
            canDelete: false, // لا يمكن حذف الصورة
            canSave: true     // يمكن حفظ الصورة
        };
    } 
    // في حالة عدم وجود صورة شخصية (profileImage) أو عدم وجود عرض للصورة (imagePreview)
    else {
        // إرجاع كائن يحتوي على عدم إمكانية حذف الصورة أو حفظها
        return {
            canDelete: false, // لا يمكن حذف الصورة
            canSave: false    // لا يمكن حفظ الصورة
        };
    }
}, [imagePreview, profileImage]); // القيم التي تؤدي إلى إعادة حساب الكائن عند تغيرها
    // استخدام دالة useUploadThing لتحميل الصور
const { startUpload, isUploading } = useUploadThing("imageUploader", {
    // التعامل مع الأخطاء عند رفع الصور
    onUploadError: (error) => {
        toast({
           
             title: m("ERRORS.UPLOAD_TITLE"), // عرض رسالة خطأ
            variant: "destructive" // تحديد نوع الرسالة (تدميرية)
        });
    },
    // التعامل مع النجاح بعد رفع الصورة
    onClientUploadComplete: (data) => {
        if (data) {
            // إذا كان هناك بيانات، يتم استدعاء دالة uploadProfilImage مع رابط الصورة
            uploadProfilImage(data[0].url);
        } else {
            // إذا لم يكن هناك بيانات، عرض رسالة خطأ
            toast({
                title: m("ERRORS.IMAGE_PROFILE_UPDATE"),
                variant: "destructive" // تحديد نوع الرسالة (تدميرية)
            });
        }
    }
});

// استخدام دالة useMutation لإدارة عملية تحديث صورة الملف الشخصي
const { mutate: uploadProfilImage, isPending } = useMutation({
    mutationFn: async (profileImage: string) => {
        // إرسال طلب POST إلى الخادم لتحديث صورة الملف الشخصي
        const { data } = await axios.post(`/api/profile/profileImage`, {
            profileImage // تمرير رابط الصورة
        });
        return data as UserType; // إرجاع البيانات من الخادم
    },
    // التعامل مع الأخطاء في عملية التحديث
    onError: () => {
        toast({
            title: m("ERRORS.IMAGE_PROFILE_UPDATE"), // عرض رسالة خطأ
            variant: "destructive" // تحديد نوع الرسالة (تدميرية)
        });
    },
    // التعامل مع النجاح بعد تحديث الصورة
    onSuccess: async () => {
        toast({
            title: m("SUCCESS.IMAGE_PROFILE_UPDATE"), // عرض رسالة نجاح
        });
        setOpen(false); // إغلاق أي واجهة مستخدم مفتوحة
        await update(); // تحديث البيانات (إذا كانت الدالة update موجودة)
        router.refresh(); // تحديث الصفحة
    },
    mutationKey: ['updateProfileImage'] // تعيين مفتاح فريد لعملية التحديث
});
// دالة onSubmit التي تُنفذ عند تقديم النموذج
const onSubmit = async (data: ImageSchema) => {
    const image: File = data.image; // استخراج الصورة من البيانات المدخلة
    await startUpload([image]); // استدعاء دالة startUpload لتحميل الصورة
}
const {mutate:deleteprofileImage,isPending:isDeleting}=useMutation({
    mutationFn:async()=>{
        const {data}=await axios.post(`/api/profile/delete_profile_image`);
        return data as UserType

    },
    onError:()=>{
        toast({
            title:m("ERRORS.IMAGE_PROFILE_UPDATE"),
            variant:"destructive"
        })
    },
    onSuccess: async () => {
        toast({
          title: m("SUCCESS.IMAGE_PROFILE_UPDATE"),
        });
        await update();
        router.refresh();
      },
      mutationKey: ["deleteProfileImage"],

})
  return (
    <div className='w-full flex flex-col items-center justify-center gap-2'>
        <p className='text-sm text-muted-foreground'>{tt("FIRST_STEP.PHOTO")}</p>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                className={cn(
                    'group relative bg-muted w-16 h-16 md:w-20 md:h-20 rounded-full flex justify-center items-center text-muted-foreground overflow-hidden',
                    className
                )}
                >
                    {profileImage?(
                        <Image
                        src={profileImage}
                        alt=''
                        fill
                        className='object-cover w-full h-full'
                        />
                    ):(
                        <User/>
                    )}
                     <div className="group-hover:opacity-80 transition-opacity duration-200 opacity-0 w-full h-full absolute bg-black flex justify-center items-center flex-col gap-1 text-xs text-white">
              <Camera size={20} />
              <p className='truncate'>{t("BUTTON")}</p>
            </div>
                </Button>

            </DialogTrigger>
            <DialogContent className='flex flex-col items-center justify-center sm:max-w-[28rem] p-0'>
                <DialogHeader className='items-center justify-center p-1'>
                    <DialogTitle>{tt("FIRST_STEP.UPLOAD_A_PHOTO")}</DialogTitle>
                </DialogHeader>
                {imagePreview?(
                    <div className='rounded-full w-32 h-32 sm:w-52 sm:h-52 relative overflow-hidden my-5'>
                        <Image
                        src={imagePreview}
                        alt=''
                        fill
                        className='object-cover w-full h-full'
                        />
                    </div>
                ):(
                    <UserAvatar
                    profileImage={profileImage}
                    size={52}
                    className='w-32 h-32 sm:w-52 sm:h-52 my-5'
                    />
                )}
                <Form {...form}>
                    <form  onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                        control={form.control}
                        name='image'
                        render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <div className='flex items-center justify-center'>
                                        <Button
                                        onClick={()=>{
                                            inputRef.current?.click()
                                        }}
                                        className='dark:text-white mb-1'
                                        type='button'
                                        >
                                            Choose a File
                                        </Button>
                                        <Input
                                        {...field}
                                        ref={inputRef}
                                        value={undefined}
                                        className='hidden'
                                        onChange={onImageChange}
                                        type='file'
                                        accept='image/*'

                                        />

                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                        />
                        <div className='flex mt-5 w-full items-center justify-center gap-4'>
                            <Button
                            disabled={!imageOptions.canDelete||isDeleting}
                            className={cn('rounded-full h-12 w-12 p-2',
                                imageOptions.canDelete?
                                'text-white'
                                :'text-muted-foreground'
                            )}
                            variant={imageOptions.canDelete?"default":"secondary"}
                            onClick={()=>deleteprofileImage}
                            type='button'

                            >
                                {isDeleting?(
                                     <LoadingState />
                                ):(
                                     <Trash size={18}/>

                                )}

                               

                            </Button>
                            <Button
                            type='submit'
                            variant={imageOptions.canSave?"default":"secondary"}
                            className={cn('rounded-full h-12 w-12 p-2',
                                imageOptions.canSave ?
                                'text-white'
                                :'text-muted-foreground'

                            )}
                            disabled={!imageOptions.canSave||isUploading||isPending}
                            >
                                {isPending || isUploading?(
                                    <LoadingState/>

                                ):(
                                    <Check size={18}/>

                                )}
                              
                            </Button>
                        </div>

                    </form>


                </Form>
            </DialogContent>
        </Dialog>
    </div>
  )
}
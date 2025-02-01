/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { UploadFile } from '@/components/onboarding/common/UploadFile'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { LoadingState } from '@/components/ui/loadingState'
import { useToast } from '@/hooks/use-toast'
import { useUploadThing } from '@/lib/uploadthing'
import { cn } from '@/lib/utils'
import { workspacePicture, WorkspacePicture } from '@/schema/workspaceSchema'
import { SettingsWorkspace } from '@/types/extended'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomColors } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Check, Trash } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  workspace:SettingsWorkspace
}

const EditWorkspaceImage = ({workspace:{id,color,image,name}}: Props) => {
    const [imagePreview,setImagePreview]=useState("");
    const [open,setOpen]=useState(false)
    const m=useTranslations("MESSAGES");
    const t=useTranslations("EDIT_WORKSPACE.PICTURE")
    const router=useRouter();
    const {toast}=useToast();
    const form=useForm<WorkspacePicture>({
      resolver:zodResolver(workspacePicture),
      defaultValues:{}
    })
    const workspaceColor = useMemo(() => {
      switch (color) {
        case CustomColors.BLUE:
          return "bg-blue-600 hover:bg-blue-500 border-blue-600 hover:border-blue-500";
        case CustomColors.EMERALD:
          return "bg-emerald-600 hover:bg-emerald-500 border-emerald-600 hover:border-emerald-500";
        case CustomColors.LIME:
          return "bg-lime-600 hover:bg-lime-500 border-lime-600 hover:border-lime-500";
        case CustomColors.ORANGE:
          return "bg-orange-600 hover:bg-orange-500 border-orange-600 hover:border-orange-500";
        case CustomColors.PINK:
          return "bg-pink-600 hover:bg-pink-500 border-pink-600 hover:border-pink-500";
        case CustomColors.YELLOW:
          return "bg-yellow-600 hover:bg-yellow-500 border-yellow-600 hover:border-yellow-500";
        case CustomColors.RED:
          return "bg-red-600 hover:bg-red-500 border-red-600 hover:border-red-500";
        case CustomColors.PURPLE:
          return "bg-purple-600 hover:bg-purple-500 border-purple-600 hover:border-purple-500";
        case CustomColors.GREEN:
          return "bg-green-600 hover:bg-green-500 border-green-600 hover:border-green-500";
        case CustomColors.CYAN:
          return "bg-cyan-600 hover:bg-cyan-500 border-cyan-600 hover:border-cyan-500";
        case CustomColors.INDIGO:
          return "bg-indigo-600 hover:bg-indigo-500 border-indigo-600 hover:border-indigo-500";
        case CustomColors.FUCHSIA:
          return "bg-fuchsia-600 hover:bg-fuchsia-500 border-fuchsia-600 hover:border-fuchsia-500";
        default:
          return "bg-blue-600 hover:bg-blue-500 border-blue-600 hover:border-blue-500";
      }
    }, [color]);
    const imageOptions = useMemo(() => {
      // استخدام useMemo لتحسين الأداء عن طريق حفظ القيمة المحسوبة
      if (!imagePreview && image) {
        // إذا لم يكن هناك عرض للصورة لكن توجد صورة
        return {
          canDelete: true, // يمكن حذف الصورة
          canSave: false   // لا يمكن حفظ الصورة
        };
      } else if (imagePreview && image) {
        // إذا كان هناك عرض للصورة وتوجد صورة
        return {
          canDelete: false, // لا يمكن حذف الصورة
          canSave: true     // يمكن حفظ الصورة
        };
      } else if (imagePreview && !image) {
        // إذا كان هناك عرض للصورة لكن لا توجد صورة
        return {
          canDelete: false, // لا يمكن حذف الصورة
          canSave: true     // يمكن حفظ الصورة
        };
      } else {
        // إذا لم توجد صورة ولا يوجد عرض للصورة
        return {
          canDelete: false, // لا يمكن حذف الصورة
          canSave: false    // لا يمكن حفظ الصورة
        };
      }
    }, [imagePreview, image]); // يعتمد على imagePreview و image
    const { startUpload, isUploading } = useUploadThing("imageUploader", {
      onUploadError: (error) => {
        // دالة تُستدعى عند حدوث خطأ أثناء رفع الصورة
        toast({
          title: m("ERRORS.WORKSPACE_ICON_ADDED"), // عرض رسالة خطأ
          variant: "destructive" // شكل الرسالة
        });
      },
      onClientUploadComplete: (data) => {
        // دالة تُستدعى عند اكتمال رفع الصورة
        if (data) {
          // إذا كانت هناك بيانات، يتم تحديث صورة مساحة العمل
          updateWorkspacePicture(data[0].url);
        } else {
          // إذا لم توجد بيانات، عرض رسالة خطأ
          toast({
            title: m("ERRORS.WORKSPACE_ICON_ADDED"), // عرض رسالة خطأ
            variant: "destructive" // شكل الرسالة
          });
        }
      }
    });
    const { mutate: updateWorkspacePicture, isPending } = useMutation({
      mutationFn: async (picture: string) => {
        // دالة تقوم بإرسال طلب لتحديث صورة مساحة العمل
        const { data: result } = await axios.post(`/api/workspace/edit/picture`, {
          id, // معرف مساحة العمل
          picture // الصورة الجديدة
        });
        return result; // إرجاع النتيجة المستلمة
      },
      onError: (err: AxiosError) => {
        // التعامل مع الأخطاء عند حدوثها
        const error = err.response?.data ? err.response.data : "ERRORS.DEFAULT"; // الحصول على رسالة الخطأ
        toast({
          title: m(error), // عرض رسالة الخطأ
          variant: "destructive" // شكل الرسالة
        });
      },
      onSuccess: async() => {
        // الإجراءات التي تتم عند نجاح العملية
        toast({
          title: m("SUCCESS.WORKSPACE_PICTURE_UPDATED"), // عرض رسالة النجاح
        });
        router.refresh(); // تحديث الصفحة
      },
      mutationKey: ['changeWorkspacePicture'] // مفتاح لتحديد العملية
    });
    const { mutate: deleteWorkspacePicture, isPending: isDeleting } = useMutation({
      mutationFn: async () => {
        // دالة تقوم بإرسال طلب لحذف صورة مساحة العمل
        await axios.post(`/api/workspace/delete/picture`, { id });
      },
      onError: (err: AxiosError) => {
        // التعامل مع الأخطاء عند حدوثها
        const error = err.response?.data ? err.response.data : "ERRORS.DEFAULT"; // استخراج رسالة الخطأ
        toast({
          title: m(error), // عرض رسالة الخطأ
          variant: "destructive" // شكل الرسالة
        });
      },
      onSuccess: async () => {
        // الإجراءات التي تتم عند نجاح العملية
        toast({
          title: m("SUCCESS.WORKSPACE_PICTURE_DELETED"), // عرض رسالة النجاح
        });
        router.refresh(); // تحديث الصفحة
      },
      mutationKey: ["deleteWorkspacePicture"] // مفتاح لتحديد العملية
    });

  const onSubmit=async(data:WorkspacePicture)=>{
    const image:File=data.file;
    await startUpload([image]);

  }
  const onSetImagePreview=(image:string)=>{
    setImagePreview(image)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className='flex flex-col space-y-1.5 justify-start'>
        <Label className='text-muted-foreground'>{t("LABEL")}</Label>
        <DialogTrigger asChild>
          <Button
          className={cn(
            `w-16 h-16 text-white font-bold ${!image && workspaceColor}`
          )}
          variant={image ?"ghost":"default"}
          size={"icon"}
          onClick={()=>{
            form.clearErrors("file")
            setImagePreview("")
          }}
          >
            {image?(
              <Image
              src={image}
              width={450}
              height={450}
              alt='workspace image'
              className='w-16 h-16 rounded-md object-cover'
              />

            ):(
              name[0].toUpperCase()

            )}


          </Button>

        </DialogTrigger>


      </div>
      <DialogContent className='sm:max-w-[28rem] flex flex-col justify-center items-center p-8'>
        <DialogHeader className='items-center justify-center'>
          <DialogTitle>{t("TITLE")}</DialogTitle>
        </DialogHeader>
        <div className={`w-32 h-32 sm:w-40 sm:h-40 text-4xl text-white font-bold rounded-lg flex items-center justify-center my-5 ${
          !imagePreview && !image && workspaceColor
        } pointer-events-none`}>
          {imagePreview?(
            <Image
            src={imagePreview}
            width={450}
            height={450}
            alt='workspace image'
            className='sm:w-40 sm:h-40 w-32 h-32 rounded-md object-cover'
            />

          ):image?(
            <Image
            src={image}
            alt='workspace image'
            height={450}
            width={450}
            className='sm:w-40 sm:h-40 w-32 h-32 rounded-md object-cover'

            

            />

          ):(
            name[0].toUpperCase()
          )}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} >
            <UploadFile
            hideFileName
            useAsBtn
            onGetIamePreview={onSetImagePreview}
            btnText={t("BTN")}
            ContainerClassName='w-full'
            form={form}
            schema={workspacePicture}
            inputAccept='image/*'
            />
            <div className='mt-5 w-full flex justify-center items-center gap-4'>
              <Button
              className={`rounded-full w-12 h-12 p-2 ${
                imageOptions.canDelete
                ? "text-white"
                :"text-muted-foreground"
              }`}
              onClick={()=>deleteWorkspacePicture()}
              type='button'
              disabled={!imageOptions.canDelete||isDeleting}
              variant={imageOptions.canDelete?"default":"secondary"}
              >
              {isDeleting?(<LoadingState/>):(<Trash size={18}/>)}  
              </Button>
              <Button
                 className={`rounded-full w-12 h-12 p-2 ${
                  imageOptions.canSave
                  ? "text-white"
                  :"text-muted-foreground"
                }`}
                type='submit'
                disabled={!imageOptions.canSave||isUploading||isPending}
                variant={imageOptions.canSave?"default":"secondary"}
              >
                {isUploading|| isPending?(
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
  )
}

export default EditWorkspaceImage
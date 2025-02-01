"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingState } from '@/components/ui/loadingState'
import Warnning from '@/components/ui/warning'
import { useToast } from '@/hooks/use-toast'
import { SettingsWorkspace } from '@/types/extended'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {
    workspace:SettingsWorkspace
}

const DeleteWorkspace = ({workspace:{name,id}}: Props) => {
 // استيراد الدوال والمكتبات اللازمة
const t = useTranslations("EDIT_WORKSPACE.DELETE"); // استخدام الترجمة للرسائل الخاصة بحذف مساحة العمل
const m = useTranslations("MESSAGES"); // استخدام الترجمة للرسائل العامة
const { toast } = useToast(); // استيراد دالة toast لعرض الرسائل المنبثقة
const router = useRouter(); // استيراد دالة router للتنقل بين الصفحات

// تعريف مخطط بيانات حذف مساحة العمل باستخدام مكتبة Zod
const deleteWorkspaceSchema = z.object({
  workspaceName: z.string()
    .refine(
      (workspaceName) => workspaceName === name, // التحقق من أن اسم مساحة العمل يتطابق مع اسم محدد
      "SCHEMA.WORKSPACE.WRONG_NAME" // رسالة الخطأ إذا كان الاسم غير صحيح
    )
});

// تعريف نوع البيانات بناءً على المخطط الذي تم إنشاؤه
type DeleteWorkspaceSchema = z.infer<typeof deleteWorkspaceSchema>;

// إعداد النموذج باستخدام useForm
const form = useForm<DeleteWorkspaceSchema>({
  resolver: zodResolver(deleteWorkspaceSchema), // استخدام Zod كحل للمخططات
  defaultValues: {
    workspaceName: "" // القيمة الافتراضية لاسم مساحة العمل
  }
});

// تعريف دالة حذف مساحة العمل باستخدام useMutation
const { mutate: deleteWorkspace, isPending } = useMutation({
  mutationFn: async (formData: DeleteWorkspaceSchema) => {
    // إجراء الطلب لحذف مساحة العمل
    const { data } = (await axios.post("/api/workspace/delete/workspace", {
      id, // معرف مساحة العمل
      workspaceName: formData.workspaceName // اسم مساحة العمل من بيانات النموذج
    })) as AxiosResponse<DeleteWorkspaceSchema>;
    return data; // إرجاع البيانات المستلمة
  },
  onError: (err: AxiosError) => {
    // التعامل مع الأخطاء
    const error = err.response?.data ? err.response.data : "ERRORS.DEFAULT"; // رسالة الخطأ
    toast({
      title: m(error), // عرض رسالة الخطأ
      variant: "destructive", // شكل الرسالة
    });
  },
  onSuccess: async () => {
    // عند نجاح العملية
    toast({
      title: m("SUCCESS.DELETE_WORKSPACE_INFO"), // عرض رسالة النجاح
    });
    router.push("/dashboard/settings"); // الانتقال إلى صفحة إعدادات لوحة التحكم
    router.refresh(); // تحديث الصفحة
  },
  mutationKey: ['deleteWorkspace'] // مفتاح لتحديد العملية
});

// دالة التعامل مع تقديم النموذج
const onSubmit = (data: DeleteWorkspaceSchema) => {
  deleteWorkspace(data); // استدعاء الدالة لحذف مساحة العمل مع بيانات النموذج
};
return (
  <Card className="bg-background border-none shadow-none max-w-3xl">
    <CardHeader>
      <CardTitle>{t("TITLE")}</CardTitle>
      <CardDescription>{t("DESC")}</CardDescription>
    </CardHeader>
    <CardContent className="pt-0 sm:pt-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-sm"
        >
          <div className="space-y-2 sm:space-y-4 w-full">
            <FormField
              control={form.control}
              name="workspaceName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-muted-foreground uppercase text-xs">
                    {t("LABEL")}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                //   disabled={!form.formState.isValid}
                type="button"
                variant={"destructive"}
                className=""
              >
                {t("BTN")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-destructive">
                  {t("DIALOG.TITLE")}
                </DialogTitle>
                <DialogDescription>{t("DIALOG.DESC")}</DialogDescription>
              </DialogHeader>
              <Warnning>
                <p>{t("DIALOG.WARNING")}</p>
              </Warnning>
              <Button
                disabled={isPending}
                onClick={form.handleSubmit(onSubmit)}
                size={"lg"}
                variant={"destructive"}
              >
                {isPending ? (
                  <LoadingState loadingText={t("DIALOG.PENDING_BTN")} />
                ) : (
                  t("DIALOG.BUTTON")
                )}
              </Button>
            </DialogContent>
          </Dialog>
        </form>
      </Form>
    </CardContent>
  </Card>
);
}

export default DeleteWorkspace
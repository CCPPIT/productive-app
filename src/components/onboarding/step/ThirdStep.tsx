import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { workspaceSchema, WorkspaceSchema } from '@/schema/workspaceSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { UploadFile } from '../common/UploadFile';
import { Button } from '@/components/ui/button';
import { LoadingState } from '@/components/ui/loadingState';
import { ArrowRight } from 'lucide-react';
import { useOnboardingForm } from '@/context/OnboardingForm';
import { ActionType } from '@/types/onBoardingContext';



const ThirdStep = () => {
  const [isUploading,startUpload]=useState(false)
  const {currentStep,dispatch}=useOnboardingForm()
  const t = useTranslations("ONBOARDING_FORM");
  const form=useForm<WorkspaceSchema>({
    resolver:zodResolver(workspaceSchema),
    defaultValues:{
      workspaceName:""
    }
  })
  const onSubmit=(data:WorkspaceSchema)=>{
    dispatch({type:ActionType.WORKSPACE_NAME,payload:data.workspaceName});
    dispatch({type:ActionType.CHANGE_SITE,payload:currentStep+1})
  }

  return (
    <>
     <div className='flex flex-col items-center justify-center gap-4 w-full my-10 text-center'>
      <h2 className='font-bold text-4xl md:text-5xl max-w-md'>
      {t("THIRD_STEP.TITLE")}

      </h2>
     </div>
     <Form {...form}>
      <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='w-full max-w-md space-y-8 mt-12'
      >
        <div className='space-y-1.5'>
          <FormField
          name='workspaceName'
          control={form.control}
          render={({field})=>(
            <FormItem>
              <FormLabel className='text-muted-foreground'>
              {t("THIRD_STEP.INPUTS.NAME")}
              </FormLabel>
              <FormControl>
                <Input
                className='bg-muted'
                {...field}
                placeholder={t("THIRD_STEP.PLACEHOLDERS.NAME")}
                />
              </FormControl>
              <FormMessage/>

            </FormItem>

          )}
          />

        </div>
        <UploadFile
        form={form}
        schema={workspaceSchema}
        inputAccept='image/*'
        typesDescription={t("THIRD_STEP.IMAGE")}
        ContainerClassName='w-full'
        LabelClassName='text-muted-foreground mb-1.5 self-start'
        LabelText={t("THIRD_STEP.INPUTS.FILE")}
        />
        <Button
        type='submit'
        className='w-full mt-10 max-w-md dark:text-white font-semibold'
        >
          {isUploading?(
            <LoadingState/>
          ):(
            <>
             {t("NEXT_BTN")}
            <ArrowRight className='ml-2' width={18} height={18}/>
            </>
          )}

        </Button>

      </form>

     </Form>

    </>
   
  )
}

export default ThirdStep
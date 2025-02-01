"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingState } from '@/components/ui/loadingState';
import { useTranslations } from 'next-intl';
import React from 'react'
import { useForm } from 'react-hook-form';

type Props = {}

export const ChangePassword = (props: Props) => {
    const t = useTranslations("SETTINGS.SECURITY.FORM");
    const isPending=false;
    const form=useForm();
  return (
  <Form {...form}>
    <form className='space-y-6 p-0 sm:p-0 w-full max-w-md'>
        <div className='space-y-2 sm:space-y-4 w-full'>
        <FormField
        control={form.control}
        name='current_password'
        render={({field})=>(
            <FormItem className='w-full'>
                <FormLabel className='text-muted-foreground text-xs uppercase'>{t("CURRENT.LABEL")}</FormLabel>
                <FormControl>
                    <Input
                    type='password'
                    className='bg-muted'
                    placeholder={t("CURRENT.PLACEHOLDER")}
                    {...field}
                    />
                </FormControl>
                <FormMessage/>

            </FormItem>
        )}
        />
         <FormField
        control={form.control}
        name='new_password'
        render={({field})=>(
            <FormItem className='w-full'>
                <FormLabel className='text-muted-foreground text-xs uppercase'>{t("NEW.LABEL")}</FormLabel>
                <FormControl>
                    <Input
                    type='password'
                    className='bg-muted'
                    placeholder={t("NEW.PLACEHOLDER")}
                    {...field}
                    />
                </FormControl>
                <FormMessage/>

            </FormItem>
        )}
        />
         <FormField
        control={form.control}
        name='repeat_password'
        render={({field})=>(
            <FormItem className='w-full'>
                <FormLabel className='text-muted-foreground text-xs uppercase'>{t("REPEAT.LABEL")}</FormLabel>
                <FormControl>
                    <Input
                    type='password'
                    className='bg-muted'
                    placeholder={t("REPEAT.PLACEHOLDER")}
                    {...field}
                    />
                </FormControl>
                <FormMessage/>

            </FormItem>
        )}
        />
        </div>
        <Button 
        disabled={isPending}
        className='text-white'
        >
            {isPending?(
                <LoadingState loadingText={t("BTN_PENDING")}/>
            ):(
                t("BTN")
            )}
             
        </Button>
    </form>

  </Form>
  )
}
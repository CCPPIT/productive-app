"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingState } from '@/components/ui/loadingState'
import Warnning from '@/components/ui/warning'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {}

export const DeleteAccount = (props: Props) => {
    const t=useTranslations("SETTINGS.ACCOUNT");
    const m=useTranslations("MESSAGES");
    const form=useForm();
    const isPending=false
  return (
    <Card className='bg-background border-none shadow-none max-w-2xl'>
        <CardHeader>
            <CardTitle>{t("DELETE_TITLE")}</CardTitle>
            <CardDescription>{t("DELETE_DESC")}</CardDescription>
        </CardHeader>
        <CardContent className='pt-0 sm:pt-0'>
            <Form {...form}>
                <form
                className='space-y-4 w-full max-w-sm'
                >
                    <div className='space-y-2 sm:space-y-4 w-full'>
                        <FormField
                        control={form.control}
                        name='email'
                        render={({field})=>(
                            <FormItem className='text-muted-foreground uppercase text-xs'>
                                <FormLabel>{t("DELETE_LABEL")}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t("DELETE_PLACEHOLDER")} {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                            type='button'
                            variant={"destructive"}
                            className=''
                            >
                                {t("DELETE_BTN")}
                            </Button>

                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className='text-destructive'>{t("DIALOG.TITLE")}</DialogTitle>
                                <DialogDescription>{t("DIALOG.DESC")}</DialogDescription>
                            </DialogHeader>
                            <Warnning>
                                <p>{t("DIALOG.WARNING")}</p>
                            </Warnning>
                            <Button
                            size={'lg'}
                            variant={"destructive"}
                            >
                                {isPending?(
                                    <LoadingState loadingText={t("DIALOG.PENDING_BTN")}/>
                                ):(
                                    t("DIALOG.BUTTON")
                                )}
                            </Button>
                        </DialogContent>
                    </Dialog>

                </form>

            </Form>

        </CardContent>
    </Card>
  )
}
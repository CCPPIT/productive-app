"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader } from '../ui/card'
import { useTranslations } from 'next-intl'
import { SettingsForm } from './SettingsForm'

type Props = {}

export const SettingsContainer = (props: Props) => {
    const t=useTranslations("POMODORO.SETTINGS.CARD")
  return (
   <Card className='bg-background border-none shadow-none'>
    <CardHeader>
        <h1 className='text-2xl font-semibold leading-none tracking-tight'>{t("TITLE")}</h1>
        <CardDescription className='text-base'>{t("DESC")}</CardDescription>
    </CardHeader>
    <CardContent className='max-w-2xl'>
        <SettingsForm/>

    </CardContent>

   </Card>
  )
}
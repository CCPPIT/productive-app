"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { ThemeCard } from './ThemeCard'
import { useTheme } from 'next-themes'
import { LoadingState } from '@/components/ui/loadingState'
import { Sun } from 'lucide-react'



export const Theme = () => {
    const t=useTranslations("SIDEBAR");
    const m=useTranslations("SETTINGS");
    const {theme,setTheme}=useTheme();
    const [isMounted,setIsMounted]=useState(false);
    useEffect(()=>{
      setIsMounted(true)
    },[])
    if(!isMounted){
      return(
        <div>
          <LoadingState className='w-12 h-12'/>
        </div>
      )
    }
  return (
   <Card className='bg-background border-none shadow-none'>
    <CardHeader>
        <CardTitle>{t("SETTINGS.THEME")}</CardTitle>
        <CardDescription className='text-base'>{m("ACCOUNT.THEME")}</CardDescription>
    </CardHeader>
    <CardContent className='flex flex-wrap justify-center gap-6'>
      <ThemeCard
      theme= 'light' onTheme={setTheme}
      icon={<Sun size={20}/>}
      activeTheme={theme}

      
      />
      <ThemeCard theme= 'dark'  onTheme={setTheme} activeTheme={theme}/>
      <ThemeCard theme= 'system' onTheme={setTheme} activeTheme={theme}/>

    </CardContent>

   </Card>
  )
}
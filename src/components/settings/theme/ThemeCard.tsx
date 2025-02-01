 "use client"
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {  Laptop, Moon, } from 'lucide-react';
import { useTranslations } from 'next-intl';
 import React from 'react'

type Props = {
  theme:"light"|"dark"|"system";
  activeTheme?:string;
  onTheme:(theme:string)=>void
  icon?:JSX.Element
}

export const ThemeCard = ({theme,activeTheme,onTheme,icon}: Props) => {
  const t=useTranslations("SETTINGS")
  return (
   <Card
   onKeyDown={(e)=>{
    if(e.key==="Enter"){
      onTheme(theme);
    }

   }}
   onClick={()=>onTheme(theme)}
   className={`${
    activeTheme===theme?"border-primary/10":""
   } w-full max-w-sm sm:max-w-lg sm:w-[calc((100%/2)-1.5rem)] xl:w-[calc((100%/3)-1.5rem)] hover:bg-accent hover:text-accent-foreground duration-200 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background`}
   >
    <CardHeader className='flex flex-row items-center justify-between space-x-0 space-y-0'>
      <div className='flex items-center gap-2'>
        {theme===t("ACCOUNT.LIGHT")||theme==='light' && icon}
        {theme===t("ACCOUNT.DARK")||theme==='dark'&&<Moon size={20}/>}
        {theme===t("ACCOUNT.SYSTEM")||theme==='system'&&<Laptop size={20}/>}
        <CardTitle>{theme[0].toUpperCase()+theme.slice(1)} </CardTitle>
      </div>
      {activeTheme===theme&&<Badge variant={"default"}>{t("ACCOUNT.ACTIVE")}</Badge>}

    </CardHeader>
    {/* <CardContent className='h-44'></CardContent>
    <CardFooter>{theme}</CardFooter> */}

   </Card>
  )
}
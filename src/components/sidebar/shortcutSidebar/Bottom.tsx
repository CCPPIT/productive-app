"use client"
import LocaleSwitcher from '@/components/switchers/localeSwitcher'
import { ThemeSwitcher } from '@/components/switchers/ThemeSwitcher'
import ActiveLink from '@/components/ui/active-link'
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { LogOutIcon, Settings2 } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'



export const Bottom = () => {
    const t=useTranslations("SIDEBAR")
    const lang=useLocale()
    const logOutHandler=()=>{
        signOut({
            callbackUrl:`${window.location.origin}/${lang}`
        })
    }
  return (
    <div className='flex flex-col gap-4'>
        <ThemeSwitcher
        
         alignDropdown='start'
         alignHover='start'
         variant={"ghost"}
         size={"icon"}
        />
        <LocaleSwitcher
        textSize='text-lg'
        alignDropdown='start'
        alignHover='start'
        variant={"ghost"}
        size={"icon"}
        />
        <HoverCard openDelay={250} closeDelay={250}>
            <HoverCardTrigger tabIndex={1}>
                <Button onClick={logOutHandler} variant={"ghost"}>
                    <LogOutIcon/>
                </Button>

            </HoverCardTrigger>

        </HoverCard>
        <HoverCard openDelay={250} closeDelay={250}>
            <HoverCardTrigger asChild tabIndex={1}>
                <ActiveLink
                include='settings'
                variant={"ghost"}
                size={"icon"}
                href='/dashboard/settings'
                >
                    <Settings2/>

                </ActiveLink>

            </HoverCardTrigger>
            <HoverCardContent align='start'>
                <span>{t("MAIN.SETTINGS_HOVER")}</span>

            </HoverCardContent>

        </HoverCard>
    </div>
  )
}
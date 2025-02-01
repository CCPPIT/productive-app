import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { Button } from '../ui/button'
import { Bell } from 'lucide-react'
import { useTranslations } from 'next-intl'

type Props = {}

export const NotificationContainer = (props: Props) => {
    const m=useTranslations("MESSAGES");
    const t=useTranslations("NOTIFICATIONS")
  return (
   <Popover>
    <HoverCard openDelay={250} closeDelay={250}>
        <PopoverTrigger asChild>
            <HoverCardTrigger>
                <Button className='w-6 h-6 sm:h-9 sm:w-9 relative'
                variant={"ghost"}
                size={"icon"}
                >
                    <Bell size={18}/>

                </Button>
            </HoverCardTrigger>

        </PopoverTrigger>
        <HoverCardContent>
        <span>{t("TITLE")}</span>
        </HoverCardContent>
        <PopoverContent 
        side='bottom'
        align='end'
        className="w-fit max-w-[300px] sm:max-w-[390px] p-2 sm:p-4"

        >
              t
        </PopoverContent>
    </HoverCard>
   </Popover>
  )
}


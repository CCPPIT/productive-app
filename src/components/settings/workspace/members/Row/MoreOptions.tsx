import React from 'react'
import { SubscriptionUser } from '@/types/extended'
import { UserPermission as UserPermissionType } from '@prisma/client'
import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Warnning from '@/components/ui/warning'
import { LoadingState } from '@/components/ui/loadingState'

type Props = {
    userRole:UserPermissionType,
    userId:string
     
    
    workspaceId:string,
    onSetworkspacesubscribers:React.Dispatch<
    React.SetStateAction<SubscriptionUser[]>>
}

const MoreOptions = ({userRole,userId,workspaceId,onSetworkspacesubscribers}: Props) => {
  const t=useTranslations("EDIT_WORKSPACE.MEMBERS.OPTIONS")
  const isPending=false;
  return (
    <div className='flex justify-end'>
      {userRole ==="OWNER"&&(
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='text-primary hover:text-primary'
              variant={"ghost"}
              size={"icon"}
              >
                <MoreHorizontal size={18}/>
              </Button>

            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent align='end' sideOffset={-8}>
                <DialogTrigger className='w-full'>
                  <DropdownMenuItem className='cursor-pointer'>
                    {t("REMOVE_BTN")}

                  </DropdownMenuItem>

                </DialogTrigger>

              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
          <DialogPortal>
            <DialogOverlay/>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("REMOVE.TITLE")}</DialogTitle>
              </DialogHeader>
              <Warnning blue>
                <p>{t("REMOVE.NOTE")}</p>
                
              </Warnning>
              <Button
              size={"lg"}
              variant={"secondary"}
              >
                {isPending?(
                  <LoadingState loadingText={t("REMOVE.BTN_PENDING")}/>
                ):(
                  t("REMOVE.BTN")
                )}

              </Button>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      )}
    </div>
  )
}

export default MoreOptions
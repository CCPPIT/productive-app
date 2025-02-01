import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LoadingState } from '@/components/ui/loadingState'
import { SubscriptionUser } from '@/types/extended'
import { UserPermission as UserPermissionType } from '@prisma/client'
import { useTranslations } from 'next-intl'
import React from 'react'

type Props = {
  userRole:UserPermissionType,
  user:{
    id:string,
    image?:string|null|undefined,
    username:string,
  },
  workspaceId:string,
  onSetworkspacesubscribers:React.Dispatch<
  React.SetStateAction<SubscriptionUser[]>>
}

const UserPermission = ({userRole,user,workspaceId,onSetworkspacesubscribers}: Props) => {
  const t=useTranslations("PERMISSIONS")
  const isPending=false
  return (

    <div>
      {isPending?(
        <LoadingState loadingText={t("WAIT")}/>
      ):(
        <>
        {userRole ==="OWNER"?(
          <div className='flex gap-1 h-9 items-center px-3 text-sm font-medium'>
            <span className='hidden sm:inline'>{userRole}</span>
            <span>{t("OWNER.TITLE")}</span>

          </div>

        ):(
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button>
                
              </Button>

            </DropdownMenuTrigger>

          </DropdownMenu>

        )}
        </>
      )}
    </div>
  )
}

export default UserPermission
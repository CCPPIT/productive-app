import { UserAvatar } from '@/components/ui/user-avatar'
import { SubscriptionUser } from '@/types/extended'
import { UserPermission as UserPermissionType } from '@prisma/client'
import React from 'react'
import UserPermission from './UserPermission'
import MoreOptions from './MoreOptions'

type Props = {
  userRole:UserPermissionType,
  user:{
    id:string,
    image?:string|null|undefined,
    username:string
  },
  workspaceId:string,
  onSetWorkspacesubscribers:React.Dispatch<React.SetStateAction<SubscriptionUser[]>>
}

const MembersRow = ({userRole,user,workspaceId,onSetWorkspacesubscribers}: Props) => {
  return (
    <li className='w-full grid grid-cols-3 items-center grid-rows-1 gap-4 p-4 border-b last:border-b-0 text-sm sm:text-base h-16'>
         <div className='flex items-center gap-2'>
          <UserAvatar
          profileImage={user.image}
          size={14}
          className='w-8 h-8 hidden sm:flex'
          />
          <p className='font-semibold'>{user.username}</p>
         </div>
         <UserPermission
         userRole={userRole}
          user={user}
         workspaceId={workspaceId}
         onSetworkspacesubscribers={onSetWorkspacesubscribers}
         />
         <MoreOptions
         userRole={userRole}
         userId={user.id}
         workspaceId={workspaceId}
         onSetworkspacesubscribers={onSetWorkspacesubscribers}
         />
        

    </li>
 
  )
}

export default MembersRow
"use client"
import { Button } from '@/components/ui/button'
import { SettingsWorkspace } from '@/types/extended'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import MembersRow from './Row/MembersRow'

type Props = {
  workspace:SettingsWorkspace,
  workspaceId:string
}

const MembersTable = ({workspace,workspaceId}: Props) => {
  const [currentSort,setCurrentSort]=useState<"asc"|"desc">("desc");
  const t=useTranslations("EDIT_WORKSPACE.MEMBERS.TABLE");
  const [workspacesubscribers,setWorkspacesubscribers]=useState(
    workspace.subscribers
  )
  return (
    <div className='w-full flex flex-col border rounded-md'>
      <div className='grid grid-cols-3 grid-rows-1 gap-4 p-4 border-b items-center'>
        {currentSort==="desc"?(
          <Button
          className='flex gap-1 items-center w-fit'
          onClick={()=>{}}
          size={"sm"}
          variant={"ghost"}
          >
             <p className='font-semibold text-sm'>{t("USERNAME")}</p>
             <ChevronDown/>

          </Button>

        ):(
          <Button className='flex gap-1 items-center w-fit'
          onClick={()=>{}}
          size={"sm"}
          variant={"ghost"}
          >
            <p className='font-semibold text-sm'>{t("USERNAME")}</p>
            <ChevronUp/>
          </Button>

        )}
        <p className='font-semibold text-sm md:hidden'>{t("PERMISSION_SMALL")}</p>
        <p className='font-semibold text-sm md:inline hidden'>{t("PERMISSION_BIG")}</p>



      </div>
      <ul>
        {workspacesubscribers.map((subscriber)=>(
          <MembersRow
          key={subscriber.user.id}
          user={subscriber.user}
          userRole={subscriber.userRole}
          workspaceId={workspaceId}
          onSetWorkspacesubscribers={setWorkspacesubscribers}
          />
        ))}
      </ul>
      
    </div>
  )
}

export default MembersTable
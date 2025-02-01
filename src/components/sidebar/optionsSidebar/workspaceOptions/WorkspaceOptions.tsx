"use client"
import { useTranslations } from 'next-intl'
import React from 'react'
import { WorkspaceOption } from './WorkspaceOption'
import { PencilRuler, Workflow } from 'lucide-react'
import { NewTask } from './actions/NewTask'
import { NewMindMap } from './actions/NewMindMap'
import { UsersContainer } from './userlist/UsersContainer'
import { useQuery } from '@tanstack/react-query'
import { WorkspaceShortcuts } from '@/types/extended'

type Props = {
  workspaceId:string
}

 export const WorkspaceOptions = ({workspaceId}: Props) => {
  const t=useTranslations("SIDEBAR.WORKSPACE_OPTIONS");
  const {data:workspaceShotcuts,isLoading}=useQuery({
    queryFn:async()=>{
      const res=await fetch(
        `/api/workspace/get/workspace_shortcuts?workspaceId=${workspaceId}`
      );
      if(!res.ok) return null;
      const data=await res.json();
      return data as WorkspaceShortcuts



    },
    queryKey:['getWorkspaceShortcuts',workspaceId]
  })
  return (
    <div>
      <div>
        <p>{t("SHORTCUTS")}</p>
        {!isLoading && workspaceShotcuts&&(

       
       
        <div>
          <WorkspaceOption
          workspaceId={workspaceId}
          defaultName='Test'
          fields={workspaceShotcuts.tasks}
          href={`/tasks/task`}
          >
            <PencilRuler size={16}/>
            {t("TASKS")}

          </WorkspaceOption>
          <WorkspaceOption
          workspaceId={workspaceId}
          href={`mind-maps/mind-map`}
          fields={workspaceShotcuts.mindMaps}
          defaultName={t("DEFAULT_NAME")}
          >
            <Workflow size={16}/>
            {t("MIND_MAPS")}
          </WorkspaceOption>
          
        </div>
         )}
      

      </div>
      <div>
        <p className='text-xs sm:text-sm uppercase text-muted-foreground'>{t("ACTIONS")}</p>
        <div className='flex flex-col gap-2 w-full mt-2'>
          <NewTask workspaceId={workspaceId}/>
          <NewMindMap workspaceId={workspaceId}/>


        </div>
      </div>
      <UsersContainer/>
      
    </div>
  )
}

export default WorkspaceOptions
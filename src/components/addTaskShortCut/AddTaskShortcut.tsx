"use client"
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { Button } from '../ui/button'
import { ChevronLeft, ExternalLink, PencilRuler } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Workspace } from '@prisma/client'
import { LoadingState } from '../ui/loadingState'
import MainTab from './MainTab'
import Workspaces from './Workspaces'
import { useUserEditableWorkspaces } from '@/context/UserEditableWorkspaces'
import { useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

type Props = {
    userId:string
}

export const AddTaskShortcut = ({userId}: Props) => {
    const [open,setOpen]=useState(false)
    const [newTaskLink,setNewTaskLink]=useState<string|null>(null);
    const [currentTab,setCurrentTab]=useState<"main"|"workspace">("main")
    const t=useTranslations("TASK_SHORTCUT")
    const m=useTranslations("MESSAGES");
    const [title,setTitle]=useState("");
    const [activeWorkspace,setActiveWorkspace]=useState<Workspace|null>(null);
    const isPending=false;
   
  
   
const onSelectActiveWorkspace=(workspace:Workspace)=>{
    setActiveWorkspace(workspace);
    setCurrentTab("main")
}
const {data:workspaces,isError,isLoading:isGettingWorkspaces,refetch}=useUserEditableWorkspaces();
const queryclient=useQueryClient();
const {toast}=useToast();
const router=useRouter();
useEffect(()=>{
    if(workspaces)setActiveWorkspace(workspaces[0]);

},[workspaces])
  return (
   <Dialog open={open} onOpenChange={setOpen}>
    <HoverCard openDelay={250} closeDelay={250}>
        <HoverCardTrigger asChild>
            <DialogTrigger asChild>
                <Button
                size={"icon"}
                variant={"ghost"}
                className='w-8 h-8 sm:w-9 sm:h-9'
                >
                    <PencilRuler size={18}/>
                </Button>

            </DialogTrigger>

        </HoverCardTrigger>
        <HoverCardContent align='center'>
            <span>{t("HINT")}</span>

        </HoverCardContent>

    </HoverCard>
    <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader >
            <div className='flex flex-col items-start gap-2'>

           
            {newTaskLink&&(
                <Link
                href={newTaskLink}
                className='w-full cursor-pointer'
                 target='_blank'
                 onClick={()=>{
                    setOpen(false)
                 }}
                 >
                    <div className='mt-6 mb-4 p-2 border border-primary rounded-md bg-primary/10 w-full text-primary font-semibold flex justify-between'>
                        <p>{t("ADDED_TASK")}</p>
                        <ExternalLink/>
                    </div>
                </Link>
            )}
            <div className='flex items-center gap-2'>
                {currentTab==="workspace"&&(
                    <Button
                    className='h-8 w-8'
                    variant={"ghost"}
                    size={"icon"}
                    onClick={()=>{}}
                    >
                        <ChevronLeft/>
                    </Button>
                )}
                <DialogTitle>
                    {currentTab==="main"?t("TITLE"):t("CHOOSE_WORKSPACE")}
                </DialogTitle>
            </div>
            </div>
            {currentTab==="main" &&(
                <DialogDescription className='text-left'>
                    {t("DESC")}
                </DialogDescription>
            )}
        </DialogHeader>
        {isError?(
            <p>Error</p>
        ):(
            <>
            {isGettingWorkspaces?(
                <div>
                    <LoadingState  className='w-10 h-10'/>
                </div>


            ):(
                <>
                { " "}
                <div className='flex flex-col my-4 gap-6'>

                
                {currentTab==="main"?(

                    <MainTab/>

                ):(
                    <Workspaces
                    workspaces={workspaces}
                    onSelectActiveWorkspace={onSelectActiveWorkspace}
                    />

                )}
                </div>
                {currentTab==="main"&&(
                    <DialogFooter className='w-full'>
                        {activeWorkspace?(
                            <Button>

                            </Button>
                        ):(
                            <Button
                            className='w-full text-white'
                            >
                                {t("BTN_NO_WORKSPACES")}
                            </Button>

                        )}

                    </DialogFooter>
                )}
                </>

            )}

            </>

        )}


    </DialogContent>
   </Dialog>
  )
}
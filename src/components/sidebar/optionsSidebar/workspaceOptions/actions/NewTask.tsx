"use client";
import { Button } from '@/components/ui/button';
import { LoadingState } from '@/components/ui/loadingState';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react'

type Props = {
    workspaceId:string
}

export const NewTask = ({workspaceId}: Props) => {

    const t=useTranslations("SIDEBAR.WORKSPACE_OPTIONS");
    const isPending=false
  return (
    <Button
    variant={"ghost"}
    className='justify-start items-center gap-2'
    size={"sm"}
    >
        <Plus size={16}/>
        {isPending?<LoadingState/> :t("ADD_TASK")}

    </Button>
  )
}
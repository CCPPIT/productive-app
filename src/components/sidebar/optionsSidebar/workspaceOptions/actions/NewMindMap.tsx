"use client";
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { Button } from '@/components/ui/button';
import { LoadingState } from '@/components/ui/loadingState';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react'

type Props = {
    workspaceId:string
}

export const NewMindMap = ({workspaceId}: Props) => {
    const t=useTranslations("SIDEBAR.WORKSPACE_OPTIONS");
    const isPending=false
  return (
    <Button
    variant={"ghost"}
    className='items-center justify-start gap-2'
    size={"sm"}
    >
        <Plus size={16}/>
        {isPending?(
            <LoadingState loadingText={t("ADD_MIND_MAP_PENDING")}/>

        ):(
            t("ADD_MIND_MAP")
        )
        }

    </Button>
  )
}
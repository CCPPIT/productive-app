import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { SettingsWorkspace } from '@/types/extended'
import { useTranslations } from 'next-intl'
import React from 'react'
import MembersTable from './MembersTable'

type Props = {
    workspace:SettingsWorkspace,
    workspaceId:string
}

const MembersCard = ({workspace,workspaceId}: Props) => {
  const t=useTranslations("EDIT_WORKSPACE.MEMBERS")
  return (
   <Card className='bg-background border-none shadow-none'>
    <CardHeader>
      <h1 className='text-2xl font-semibold leading-none tracking-tight'>{t("TITLE")}</h1>
      <CardDescription>{t("DESC")}</CardDescription>
    </CardHeader>
    <CardContent>
      <MembersTable workspace={workspace} workspaceId={workspaceId}/>
    </CardContent>
   

   </Card>
  )
}

export default MembersCard
import { AddTaskShortcut } from '@/components/addTaskShortCut/AddTaskShortcut'
import { DashboardHeader } from '@/components/header/DashboardHeader'
import { Theme } from '@/components/settings/theme/Theme'
import React from 'react'

type Props = {}

const ThemeSettings = (props: Props) => {
  return (
    <>
    <DashboardHeader>
      <AddTaskShortcut/>
    </DashboardHeader>
    <Theme/>
   
    </>
  )
}

export default ThemeSettings
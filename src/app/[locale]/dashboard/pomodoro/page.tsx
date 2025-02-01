import { AddTaskShortcut } from '@/components/addTaskShortCut/AddTaskShortcut'
import { DashboardHeader } from '@/components/header/DashboardHeader'
import { SettingsContainer } from '@/components/pomodoro/SettingsContainer'
import React from 'react'

type Props = {}

const Promdoro = (props: Props) => {
  return (
    <>
    <DashboardHeader>
    <AddTaskShortcut/>

    </DashboardHeader>
    <main className='flex flex-col gap-2 h-full items-center'>
      <SettingsContainer/>
    </main>
    </>
   
  )
}

export default Promdoro
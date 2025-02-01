import { AddTaskShortcut } from '@/components/addTaskShortCut/AddTaskShortcut'
import { Calendar } from '@/components/calendar/Calendar'
import { DashboardHeader } from '@/components/header/DashboardHeader'
import React from 'react'

type Props = {}

const CalendarPage = (props: Props) => {
  return (
    <>
    <DashboardHeader>
      <AddTaskShortcut/>

    </DashboardHeader>
    <main className='h-full'>
     <Calendar/>
    
   
    </main>

    </>
   
  )
}

export default CalendarPage
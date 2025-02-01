"use client"
import React from 'react'
import { CalendarHeader } from './CalendarHeader'

type Props = {}

 export const Calendar = (props: Props) => {
  return (
    <div className='w-full h-full flex flex-col gap-8 items-center'>
        <CalendarHeader monthIndex={1} onChangeMonthHandler={()=>{}}
            onResetMonthHandler={()=>{}}/>
    </div>
  )
}
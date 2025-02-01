import LocaleSwitcher from '@/components/switchers/localeSwitcher'
import { ThemeSwitcher } from '@/components/switchers/ThemeSwitcher'
import React from 'react'

type Props = {
    children:React.ReactNode
}

const OnboardingLayout = ({children}: Props) => {
  return (
    <main className='flex min-h-screen w-full'>
          <div className='absolute top-0 left-0 w-full flex justify-end'>
            <div className='flex items-center gap-2 max-w-7xl p-4 md:p-6'>
            <LocaleSwitcher
            alignDropdown='end'
            alignHover='end'
            size={'icon'}
            variant={'outline'}
            />
            <ThemeSwitcher
            alignDropdown='end'
            alignHover='end'
            size={'icon'}
            variant={'outline'}
            />

            </div>
          </div>
          {children}

    </main>
  
  )
}

export default OnboardingLayout
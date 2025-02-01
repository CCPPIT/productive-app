// import LocaleSwitcher from '@/components/switchers/localeSwitcher'
import React from 'react'

type Props = {
    children:React.ReactNode
}

const AuthLayout = ({children}: Props) => {
  return (
    <main className='flex flex-col gap-3 justify-center items-center min-h-screen w-full p-4 md:p-6'>
      <div className='absolute top-0 left-0 w-full'>

     
        <div className='flex'>
          {/* <LocaleSwitcher
          alignHover='end'
          alignDropdown='end'
          size={'icon'}
          variant={'outline'}
          /> */}

        </div>
        </div>
        {children}
    </main>
  )
}

export default AuthLayout
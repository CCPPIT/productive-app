import Welcoming from '@/components/common/Welcoming';
import { DashboardHeader } from '@/components/header/DashboardHeader'
import { HomeRecentActivityContainer } from '@/components/homeRecentActivity/HomeRecentActivityContainer';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'



const Dashboard = async() => {
  const session=await checkIfUserCompletedOnboarding("/dashboard");
  
   
  return (
    <>
    <DashboardHeader/>
    <main className='h-full w-full'>
        <Welcoming
        hideOnDesktop
        className='px-4 py-2'
        username={session.user.username!}
        name={session.user.name}
        surname={session.user.surname}
        />
        <HomeRecentActivityContainer userId={session.user.id} initialData={[]}/>
    </main>
    </>
   
  )
}

export default Dashboard
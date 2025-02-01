import { useOnboardingForm } from '@/context/OnboardingForm'
import { cn } from '@/lib/utils'
import React from 'react'

const steps=[1,2,3,4]

export const FormStepsInfo = () => {
    const {currentStep}=useOnboardingForm()
  return (
    <div className='flex justify-center items-center gap-1 w-full'>
        {steps.map((step)=>(
            <span key={step}
            className={cn(
                'h-2.5 w-8 border px-6 py-1 rounded-md shadow-sm',
                currentStep>=step?"bg-primary":"bg-muted"
            )}
            >

            </span>
        ))}
    </div>
  )
}
"use client"
import { CustomColors, Workspace } from '@prisma/client'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { buttonVariants } from '../ui/button'

type Props = {
    workspace:Workspace,
    onSelectActiveWorkspace:(workspace:Workspace)=>void
}

const SelectWorkspace = ({workspace,onSelectActiveWorkspace}: Props) => {
    const workspaceColor=useMemo(()=>{
        switch(workspace.color){
            case CustomColors.PURPLE:
                return "bg-purple-600";
            case CustomColors.GREEN:
                return "bg-green-600";
            case CustomColors.RED:
                return "bg-red-600";
            case CustomColors.BLUE:
                return "bg-blue-600";
            case CustomColors.CYAN:
                return "bg-cyan-600";
            case CustomColors.EMERALD:
                return "bg-emerald-600";
            case CustomColors.INDIGO:
                return "bg-indigo-600";
            case CustomColors.LIME:
                return "bg-lime-600";
            case CustomColors.ORANGE:
                return "bg-orange-600";
            case CustomColors.FUCHSIA:
                return "bg-fuchia-600";
            case CustomColors.PINK:
                return "bg-pink-600" ;
            case CustomColors.YELLOW:
                return "bg-yellow-600";
            default:
                return "bg-green-600"                                 
                        

        }

    },[workspace.color])
  return (
    <div
    onClick={()=>onSelectActiveWorkspace(workspace)}
    className='flex items-center justify-between gap-2 cursor-pointer hover:bg-accent transition-colors duration-200 p-2 rounded-sm'
    >
        <div className='flex items-center gap-2'>
            <div
            className={`w-10 h-10 rounded-md shadow-sm text-white font-bold flex items-center justify-center ${workspaceColor}`}
            >
                {workspace.image?(
                    <Image
                    priority
                    src={workspace.image}
                    className='w-full h-full object-cover rounded-md'
                    alt='workspace image'
                    height={300}
                    width={300}
                    />
                ):(
                    <p>{workspace.name[0].toUpperCase()}</p>

                )}
            </div>
            <p className='font-semibold'>{workspace.name?workspace.name:"Untitled workspace"}</p>

        </div>
        <Link href={`/workspace/${workspace.id}`}
        onClick={(e)=>{
            e.stopPropagation();
        }}
        className={buttonVariants({variant:"ghost",size:"icon"})}
        >
        <ExternalLink/>
        </Link>
    </div>
  )
}

export default SelectWorkspace
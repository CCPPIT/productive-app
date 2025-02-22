"use client"
import ActiveLink from '@/components/ui/active-link'
import { CustomColors, Workspace } from '@prisma/client'
import Image from 'next/image'
import React, { useMemo } from 'react'

type Props = {
    href:string,
    workspace:Workspace
}

export const SettingsWorkspace = ({
    workspace:{color,id,image,name},
    href
}: Props) => {
    const workspaceColor=useMemo(()=>{
        switch(color){
          case CustomColors.BLUE:
        return "bg-blue-600 hover:bg-blue-500 border-blue-600 hover:border-blue-500";
      case CustomColors.EMERALD:
        return "bg-emerald-600 hover:bg-emerald-500 border-emerald-600 hover:border-emerald-500";
      case CustomColors.LIME:
        return "bg-lime-600 hover:bg-lime-500 border-lime-600 hover:border-lime-500";
      case CustomColors.ORANGE:
        return "bg-orange-600 hover:bg-orange-500 border-orange-600 hover:border-orange-500";
      case CustomColors.PINK:
        return "bg-pink-600 hover:bg-pink-500 border-pink-600 hover:border-pink-500";
      case CustomColors.YELLOW:
        return "bg-yellow-600 hover:bg-yellow-500 border-yellow-600 hover:border-yellow-500";
      case CustomColors.RED:
        return "bg-red-600 hover:bg-red-500 border-red-600 hover:border-red-500";
      case CustomColors.PURPLE:
        return "bg-purple-600 hover:bg-purple-500 border-purple-600 hover:border-purple-500";
      case CustomColors.GREEN:
        return "bg-green-600 hover:bg-green-500 border-green-600 hover:border-green-500";
      case CustomColors.CYAN:
        return "bg-cyan-600 hover:bg-cyan-500 border-cyan-600 hover:border-cyan-500";
      case CustomColors.INDIGO:
        return "bg-indigo-600 hover:bg-indigo-500 border-indigo-600 hover:border-indigo-500";
      case CustomColors.FUCHSIA:
        return "bg-fuchsia-600 hover:bg-fuchsia-500 border-fuchsia-600 hover:border-fuchsia-500";
      default:
        return "bg-blue-600 hover:bg-blue-500 border-blue-600 hover:border-blue-500";

        }

    },[color])
  return (
    <ActiveLink
    href={`${href}/${id}`}
    variant={"ghost"}
    size={"icon"}
    className='w-full flex items-center justify-start gap-2'

    >
      {image?(
        <Image
        src={image}
        alt='workspac image'
        className='w-7 h-7 object-cover rounded-md'
        height={300}
        width={300}
        />

      ):(
        <div
        className={`rounded-md text-white w-7 h-7 flex items-center justify-center ${workspaceColor}`}
        >
          {name[0].toUpperCase()}
        </div>
      )}
      <p>{name}</p>

    </ActiveLink>
  )
}
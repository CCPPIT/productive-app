import { TOP_SIDEBAR_LINKS } from '@/constants/top-sidebar-links'
import React from 'react'
import { SidebarLink } from './SidebarLink'



 export const Top = () => {
  return (
    <div className='flex items-center gap-3 flex-col'>
        {TOP_SIDEBAR_LINKS.map((link,i)=>(
            <SidebarLink
            key={i}
            href={link.href}
            Icon={link.Icon}
            hoverTextKey={link.hoverTextKey}
            include={link?.include}
            />
        ))}
    </div>
  )
}
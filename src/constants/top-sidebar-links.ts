import { CalendarDays, Clock, Home, Star, User } from "lucide-react";

export const TOP_SIDEBAR_LINKS=[
    {
        href:"/dashboard",
        Icon:Home,
        hoverTextKey:"HOME_HOVER",
    },
    {
        href:"/dashboard/pomodoro",
        include: "/dashboard/pomodoro",
        Icon:Clock,
        hoverTextKey:"POMODORO_HOVER",
    },
    {
        href: "/dashboard/calendar",
        Icon: CalendarDays,
        hoverTextKey: "CALENDAR_HOVER",
      },
      {
        href: "/dashboard/starred",
        Icon: Star,
        hoverTextKey: "STARRED_HOVER",
      },
      {
        href: "/dashboard/assigned-to-me",
        Icon: User,
        hoverTextKey: "ASSIGNED_TO_ME_HOVER",
      },
]
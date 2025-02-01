"use client"
import { Workspace } from '@prisma/client'
import React from 'react'

type Props = {
    useWorkspaces:Workspace[]
}

const AssignedToMeFilter = ({useWorkspaces}: Props) => {
  return (
    <div>AssignedToMeFilter</div>
  )
}

export default AssignedToMeFilter
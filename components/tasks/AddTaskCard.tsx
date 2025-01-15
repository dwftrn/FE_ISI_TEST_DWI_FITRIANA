'use client'

import { Add16Filled } from '@fluentui/react-icons'
import { Task } from '@prisma/client'
import { useState } from 'react'
import AddTaskForm from './AddTaskForm'

const AddTaskCard = ({ columnId }: { columnId: Task['status'] }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  if (isExpanded)
    return (
      <AddTaskForm columnId={columnId} onSuccess={() => setIsExpanded(false)} onCancel={() => setIsExpanded(false)} />
    )

  return (
    <div
      role={isExpanded ? '' : 'button'}
      className='flex cursor-pointer items-center gap-2 rounded-lg p-2 text-sm hover:bg-neutral-700'
      onClick={() => setIsExpanded(true)}
    >
      <Add16Filled />
      Tambah
    </div>
  )
}

export default AddTaskCard

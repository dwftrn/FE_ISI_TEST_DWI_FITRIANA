import { useDraggable } from '@dnd-kit/core'
import { Task } from '@prisma/client'
import { useState } from 'react'
import AddTaskForm from './AddTaskForm'
import { Edit16Regular } from '@fluentui/react-icons'

interface TaskCardProps {
  task: Task
  columnId: Task['status']
}

const TaskCard = ({ task, columnId }: TaskCardProps) => {
  const [isEdit, setIsEdit] = useState(false)

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id })

  if (isEdit)
    return (
      <AddTaskForm
        columnId={columnId}
        task={task}
        onSuccess={() => setIsEdit(false)}
        onCancel={() => setIsEdit(false)}
      />
    )

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className='group cursor-grab space-y-2 rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md'
      style={{ transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined }}
    >
      <div className='flex items-center justify-between'>
        <h2 className='font-medium text-neutral-100'>{task.title}</h2>
        <button onClick={() => setIsEdit(true)} className='cursor-pointer'>
          <Edit16Regular role='button' className='!hidden text-neutral-100 group-hover:!inline' />
        </button>
      </div>
      <p className='text-sm text-neutral-400'>{task.description}</p>
    </div>
  )
}

export default TaskCard

import { useDraggable } from '@dnd-kit/core'
import { Task } from '@prisma/client'

interface TaskCardProps {
  task: Task
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className='cursor-grab space-y-2 rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md'
      style={{ transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined }}
    >
      <h2 className='font-medium text-neutral-100'>{task.title}</h2>
      <p className='text-sm text-neutral-400'>{task.description}</p>
    </div>
  )
}

export default TaskCard

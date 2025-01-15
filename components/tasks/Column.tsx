import { Column as ColumnType } from '@/constants/constant'
import { useDroppable } from '@dnd-kit/core'
import { Task, UserRole } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { Each } from '../Each'
import AddTaskCard from './AddTaskCard'
import TaskCard from './TaskCard'

interface ColumnProps {
  column: ColumnType
  tasks: Task[]
}

const Column = ({ column, tasks }: ColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: column.id
  })

  const { data: session } = useSession()

  return (
    <div className='flex h-fit w-[272px] min-w-[272px] shrink-0 flex-col gap-4 rounded-xl bg-neutral-800 p-4'>
      <h1 className='font-semibold text-white'>{column.title}</h1>
      <div ref={setNodeRef} className='flex min-h-4 flex-1 flex-col gap-4'>
        <Each of={tasks} render={(item) => <TaskCard task={item} columnId={column.id} />} />
        {session?.user && 'role' in session?.user && session?.user.role === UserRole.LEAD && (
          <AddTaskCard columnId={column.id} />
        )}
      </div>
    </div>
  )
}

export default Column

'use client'

import { Each } from '@/components/Each'
import Column from '@/components/tasks/Column'
import { COLUMNS } from '@/constants/constant'
import useFetchTasks from '@/queries/useFetchTasks'
import useUpdateTask from '@/queries/useUpdateTask'
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { Task } from '@prisma/client'

const Tasks = () => {
  const { data: tasks } = useFetchTasks()
  const { mutateAsync: updateTask } = useUpdateTask()

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over) return

    const taskId = active.id as string
    const newStatus = over.id as Task['status']

    updateTask({ id: taskId, status: newStatus })
  }

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 0.01
    }
  })
  const mouseSensor = useSensor(MouseSensor)
  const touchSensor = useSensor(TouchSensor)
  const keyboardSensor = useSensor(KeyboardSensor)

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor, pointerSensor)

  return (
    <section className='flex w-auto min-w-full flex-1 justify-start gap-5 after:block after:w-px after:shrink-0 md:justify-center'>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <Each
          of={COLUMNS}
          render={(item) => <Column column={item} tasks={(tasks || []).filter((task) => task.status === item.id)} />}
        />
      </DndContext>
    </section>
  )
}

export default Tasks

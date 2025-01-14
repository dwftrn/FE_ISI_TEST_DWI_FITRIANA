'use client'

import { fetchAllTasks } from '@/actions/tasks'
import Button from '@/components/Button'
import Column from '@/components/Column'
import { Each } from '@/components/Each'
import { COLUMNS } from '@/constants/constant'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { Task } from '@prisma/client'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  const [tasks, setTasks] = useState<Task[]>([])

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over) return

    const taskId = active.id as string
    const newStatus = over.id as Task['status']

    setTasks(() => tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
  }

  useEffect(() => {
    if (!session) {
      router.push('/sign-in')
      return
    }

    fetchAllTasks().then((data) => setTasks(data))
  }, [router, session])

  if (!session) return null

  return (
    <>
      <header className='flex items-center justify-end gap-4 bg-neutral-900 p-5'>
        <span className='text-sm'>{session.user?.name}</span>
        <Button
          onClick={() => {
            signOut({ callbackUrl: '/sign-in' })
          }}
        >
          Sign Out
        </Button>
      </header>
      <main className='flex w-full flex-1 flex-col overflow-x-auto p-5'>
        <section className='flex w-auto min-w-full flex-1 justify-start gap-5 after:block after:w-px after:shrink-0 md:justify-center'>
          <DndContext onDragEnd={handleDragEnd}>
            <Each
              of={COLUMNS}
              render={(item) => <Column column={item} tasks={tasks.filter((task) => task.status === item.id)} />}
            />
          </DndContext>
        </section>
      </main>
    </>
  )
}

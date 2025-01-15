'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/auth'
import { prisma } from '@/lib/prisma'
import { Task, User } from '@prisma/client'
import { getServerSession } from 'next-auth'

export async function fetchAllTasks() {
  return await prisma.task.findMany()
}

export async function createTask(data: Pick<Task, 'title' | 'description' | 'status'> & { assigneeId: User['id'] }) {
  const session = await getServerSession(authOptions)
  const user = session?.user as User
  const userId = user?.id

  return await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      status: data.status,
      creator: { connect: { id: userId } },
      assignee: { connect: { id: data.assigneeId } }
    }
  })
}

export async function updateTask(data: Partial<Task> & { id: Task['id'] }) {
  return await prisma.task.update({ where: { id: data.id }, data })
}

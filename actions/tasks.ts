'use server'

import { prisma } from '@/lib/prisma'
import { Task, User } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

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

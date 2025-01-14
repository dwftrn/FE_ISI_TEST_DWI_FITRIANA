import { PrismaClient, TaskStatus, UserRole } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('password', 10)

  const leadUser = await prisma.user.upsert({
    where: { username: 'lead' },
    update: {},
    create: {
      username: 'lead',
      name: 'Lead User',
      password: password,
      role: UserRole.LEAD
    }
  })

  const teamUser = await prisma.user.upsert({
    where: { username: 'team' },
    update: {},
    create: {
      username: 'team',
      name: 'Team User',
      password: password,
      role: UserRole.TEAM
    }
  })

  //   seed tasks
  const task1 = await prisma.task.upsert({
    where: { id: '56fa9a44-14c9-41ec-be80-7c297b47ab19' },
    update: {},
    create: {
      id: '56fa9a44-14c9-41ec-be80-7c297b47ab19',
      title: 'Task 1',
      description: 'This is the first task created by the lead user.',
      status: TaskStatus.NOT_STARTED,
      creatorId: leadUser.id,
      assigneeId: teamUser.id
    }
  })

  const task2 = await prisma.task.upsert({
    where: { id: 'c94c1b44-7156-49cb-a100-b2fb49da74db' },
    update: {},
    create: {
      id: 'c94c1b44-7156-49cb-a100-b2fb49da74db',
      title: 'Task 2',
      description: 'This is the second task created by the lead user.',
      status: TaskStatus.NOT_STARTED,
      creatorId: leadUser.id,
      assigneeId: teamUser.id
    }
  })

  console.log({ users: [leadUser, teamUser], tasks: [task1, task2] })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

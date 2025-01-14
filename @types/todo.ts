import { TaskStatus } from '@prisma/client'

export type Column = {
  id: TaskStatus
  title: string
}

import { TaskStatus } from '@prisma/client'

export type Column = {
  id: TaskStatus
  title: string
}

export const COLUMNS: Column[] = [
  { id: 'NOT_STARTED', title: 'Not Started' },
  { id: 'ON_PROGRESS', title: 'On Progress' },
  { id: 'DONE', title: 'Done' },
  { id: 'REJECTED', title: 'Rejected' }
]

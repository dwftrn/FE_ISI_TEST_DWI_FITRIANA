'use client'

import { Add16Filled, Dismiss16Filled } from '@fluentui/react-icons'
import { useEffect, useState } from 'react'
import Button from './Button'
import Input from './Input'
import { createTask } from '@/actions/tasks'
import { Task, User } from '@prisma/client'
import { Each } from './Each'
import { fetchAllTeamUsers } from '@/actions/users'

const AddTaskCard = ({ columnId }: { columnId: Task['status'] }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const onAddTask = async (title: string, description: string, assigneeId: string) => {
    await createTask({ title, description, status: columnId, assigneeId })
    setIsExpanded(false)
  }

  if (isExpanded) return <AddTaskForm onAddTask={onAddTask} onCancel={() => setIsExpanded(false)} />

  return (
    <div
      role={isExpanded ? '' : 'button'}
      className='flex cursor-pointer items-center gap-2 rounded-lg p-2 text-sm hover:bg-neutral-700'
      onClick={() => setIsExpanded(true)}
    >
      <Add16Filled />
      Tambah
    </div>
  )
}

const AddTaskForm = ({
  onAddTask,
  onCancel
}: {
  onAddTask(title: string, description: string, assigneeId: string): Promise<void>
  onCancel(): void
}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [teams, setTeams] = useState<User[]>([])
  const [assigneeId, setAssigneeId] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const handleAddTask = async () => {
    setIsLoading(true)
    try {
      await onAddTask(title, description, assigneeId)
      setTitle('')
      setDescription('')
      setAssigneeId('')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAllTeamUsers().then((data) => setTeams(data))
  }, [])

  return (
    <div className='flex flex-col gap-2 rounded-lg'>
      <Input placeholder='Judul' value={title} onChange={(e) => setTitle(e.target.value)} disabled={isLoading} />
      <textarea
        placeholder='Deskripsi'
        className='w-full resize-none rounded-lg bg-neutral-700 p-4 outline-none placeholder:text-neutral-400'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isLoading}
      />
      <div className='flex items-center gap-3'>
        <Button
          onClick={handleAddTask}
          disabled={!title || !description || !assigneeId || isLoading}
          isLoading={isLoading}
        >
          Tambah
        </Button>
        <Dismiss16Filled role='button' onClick={onCancel} />
        <select
          className='ml-auto rounded-lg bg-neutral-700 p-2 text-sm text-neutral-100'
          value={assigneeId}
          onChange={(e) => setAssigneeId(e.target.value)}
          disabled={isLoading}
        >
          <option value='' disabled>
            Pilih team
          </option>
          <Each of={teams} render={(team) => <option value={team.id}>{team.name}</option>} />
        </select>
      </div>
    </div>
  )
}

export default AddTaskCard

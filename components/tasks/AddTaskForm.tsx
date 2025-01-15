import { fetchAllTeamUsers } from '@/actions/users'
import useCreateTask from '@/queries/useCreateTask'
import { Dismiss16Filled } from '@fluentui/react-icons'
import { Task, User } from '@prisma/client'
import { useEffect, useState } from 'react'
import Button from '../Button'
import { Each } from '../Each'
import Input from '../Input'

const AddTaskForm = ({
  columnId,
  onSuccess,
  onCancel
}: {
  columnId: Task['status']
  onSuccess(): void
  onCancel(): void
}) => {
  const { mutateAsync: createTask, isPending: isLoading } = useCreateTask()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [teams, setTeams] = useState<User[]>([])
  const [assigneeId, setAssigneeId] = useState('')

  const handleAddTask = async () => {
    await createTask({ title, description, status: columnId, assigneeId })
    setTitle('')
    setDescription('')
    setAssigneeId('')
    onSuccess()
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

export default AddTaskForm

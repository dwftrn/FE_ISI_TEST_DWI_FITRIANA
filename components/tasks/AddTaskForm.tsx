import { fetchAllTeamUsers } from '@/actions/users'
import useCreateTask from '@/queries/useCreateTask'
import { Dismiss16Filled } from '@fluentui/react-icons'
import { Task, User } from '@prisma/client'
import { useEffect, useState } from 'react'
import Button from '../Button'
import { Each } from '../Each'
import Input from '../Input'
import useUpdateTask from '@/queries/useUpdateTask'

interface AddTaskFormProps {
  columnId: Task['status']
  onSuccess(): void
  onCancel(): void
  task?: Task
}

const AddTaskForm = ({ columnId, onSuccess, onCancel, task }: AddTaskFormProps) => {
  const { mutateAsync: createTask, isPending: isLoadingCreate } = useCreateTask()
  const { mutateAsync: updateTask, isPending: isLoadingUpdate } = useUpdateTask()

  const isLoading = isLoadingCreate || isLoadingUpdate

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [teams, setTeams] = useState<User[]>([])
  const [assigneeId, setAssigneeId] = useState('')

  const handleAddTask = async () => {
    if (task) {
      await updateTask({ id: task.id, title, description, status: columnId, assigneeId })
    } else {
      await createTask({ title, description, status: columnId, assigneeId })
    }

    setTitle('')
    setDescription('')
    setAssigneeId('')
    onSuccess()
  }

  useEffect(() => {
    fetchAllTeamUsers().then((data) => setTeams(data))
  }, [])

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description)
      if (task.assigneeId) setAssigneeId(task.assigneeId)
    }
  }, [task])

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
          {task ? 'Ubah' : 'Tambah'}
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

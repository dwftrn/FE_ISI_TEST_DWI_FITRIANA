import { createTask } from '@/actions/tasks'
import { Task, User } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

const useCreateTask = () => {
  const queryClient = useQueryClient()
  const { data: session } = useSession()

  const currentUserId = (session?.user as User)?.id || ''

  return useMutation({
    mutationFn: createTask,
    // Optimistic update
    onMutate: async (newTask) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['tasks'] })

      // Snapshot previous value
      const previousTasks = queryClient.getQueryData(['tasks'])

      // Optimistically update to the new value
      queryClient.setQueryData(['tasks'], (oldTasks: Task[]) => [
        ...(oldTasks || []),
        { ...newTask, id: `temp-${Date.now()}`, creator: { id: currentUserId, assignee: { id: newTask.assigneeId } } }
      ])

      return { previousTasks }
    },
    onError: (_err, _newTask, context) => {
      // Rollback to the previous value
      queryClient.setQueryData(['tasks'], context?.previousTasks)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })
}

export default useCreateTask

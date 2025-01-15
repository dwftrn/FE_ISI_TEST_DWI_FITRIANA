import { updateTask } from '@/actions/tasks'
import { Task } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useUpdateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTask,
    onMutate: async (newTask) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['tasks'] })

      // Snapshot previous value
      const previousTasks = queryClient.getQueryData(['tasks'])

      // Optimistically update to the new value
      queryClient.setQueryData(['tasks'], (oldTasks: Task[]) =>
        oldTasks.map((task) => (task.id === newTask.id ? { ...task, ...newTask } : task))
      )

      return { previousTasks }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    onError: (_err, _newTask, context) => {
      // Rollback to the previous value
      queryClient.setQueryData(['tasks'], context?.previousTasks)
    }
  })
}

export default useUpdateTask

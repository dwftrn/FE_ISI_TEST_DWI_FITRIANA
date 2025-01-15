import { fetchAllTasks } from '@/actions/tasks'
import { useQuery } from '@tanstack/react-query'

const useFetchTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: fetchAllTasks
  })
}

export default useFetchTasks

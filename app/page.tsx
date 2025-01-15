import { fetchAllTasks } from '@/actions/tasks'
import Header from '@/components/Header'
import Tasks from '@/components/Tasks'
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = getServerSession()

  if (!session) redirect('/sign-in')

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['tasks'],
    queryFn: fetchAllTasks
  })

  return (
    <>
      <Header />
      <main className='flex w-full flex-1 flex-col overflow-x-auto p-5'>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Tasks />
        </HydrationBoundary>
      </main>
    </>
  )
}

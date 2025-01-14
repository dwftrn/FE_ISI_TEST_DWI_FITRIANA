import SignInForm from '@/components/SignInForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const SignInPage = async () => {
  const session = await getServerSession()
  if (session) redirect('/') // Redirect to home if user is already signed in

  return (
    <main className='flex h-dvh w-dvw items-center justify-center p-5'>
      <div className='flex w-full max-w-sm flex-col gap-4 rounded-xl bg-neutral-800 p-5 shadow-lg'>
        <h1 className='text-center font-semibold text-white'>Sign In</h1>
        <SignInForm />
      </div>
    </main>
  )
}

export default SignInPage

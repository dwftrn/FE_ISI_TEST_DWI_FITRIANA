'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Button from './Button'
import Input from './Input'

const signInFormSchema = z.object({
  username: z.string().min(1, 'Tidak boleh kosong!'),
  password: z.string().min(1, 'Tidak boleh kosong!')
})

type SignInFormValues = z.infer<typeof signInFormSchema>

const SignInForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = async (values: SignInFormValues) => {
    console.log({ values })

    setIsLoading(true)

    const result = await signIn('credentials', { ...values, redirect: false })

    setIsLoading(false)

    if (result?.error) {
      form.setError('username', { message: 'Nama pengguna atau kata sandi salah!' })
      form.setError('password', { message: 'Nama pengguna atau kata sandi salah!' })

      return
    }

    router.push('/')
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <label className='flex flex-col gap-2'>
        <span className='text-neutral-400'>Nama Pengguna</span>
        <Input
          {...form.register('username')}
          placeholder='Nama Pengguna'
          autoComplete='username'
          disabled={isLoading}
        />
        <span className='text-sm text-red-500'>{form.formState.errors.username?.message}</span>
      </label>
      <label className='flex flex-col gap-2'>
        <span className='text-neutral-400'>Kata Sandi</span>
        <Input
          {...form.register('password')}
          placeholder='Kata Sandi'
          type='password'
          autoComplete='current-password'
          disabled={isLoading}
        />
        <span className='text-sm text-red-500'>{form.formState.errors.password?.message}</span>
      </label>
      <Button disabled={isLoading} isLoading={isLoading}>
        Sign In
      </Button>
    </form>
  )
}

export default SignInForm

'use client'

import React from 'react'
import Button from './Button'
import { signOut, useSession } from 'next-auth/react'

const Header = () => {
  const { data: session } = useSession()
  if (!session) return null

  return (
    <header className='flex items-center justify-end gap-4 bg-neutral-900 p-5'>
      <span className='text-sm'>{session.user?.name}</span>
      <Button
        onClick={() => {
          signOut({ callbackUrl: '/sign-in' })
        }}
      >
        Sign Out
      </Button>
    </header>
  )
}

export default Header

import Nav from '@/components/Nav'
import { nextAuthConfig } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import React from 'react'

const layout = async ({children} : { children : React.ReactNode}) => {
  const session = await getServerSession(nextAuthConfig);
  if (session?.user) {
    redirect('/dashboard')
  }
  return (
    <div>
        <main className='max-w-5xl m-auto p-2'>
            {children}
        </main>
    </div>
  )
}

export default layout
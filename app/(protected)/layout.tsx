import Nav from '@/components/Nav'
import { nextAuthConfig } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import React from 'react'

const layout = async ({children} : { children : React.ReactNode}) => {
  
  return (
    <div className='w-full min-h-[100vh]'>
        <main className='m-auto p-2 w-full h-full'>
            {children}
        </main>
    </div>
  )
}

export default layout
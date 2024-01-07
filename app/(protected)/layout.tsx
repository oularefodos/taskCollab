
import { nextAuthConfig } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import React from 'react'
import UserIsNotVerified from './UserIsNotVerified'

interface User {
  email : string,
  id : string,
  emailVerified : null | boolean
}
const layout = async ({children} : { children : React.ReactNode}) => {
  const session = await getServerSession(nextAuthConfig)

  if (session) {
    const user = session.user as User
    const {emailVerified} = user
    if (!emailVerified) {
      return <UserIsNotVerified />
    }
  }

  return (
    <div className='w-full min-h-[100vh]'>
        <main className='m-auto p-2 w-full h-full'>
            {children}
        </main>
    </div>
  )
}

export default layout
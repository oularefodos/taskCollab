'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { LogIn, UserPlus2 } from 'lucide-react'
import UserManagementPopUp from './UserManagementPopUp'
import { useSession } from 'next-auth/react'
 
const Nav = () => {
  const {data : session} = useSession();
  return (
    <div className='flex backdrop-blur-sm bg-slate-200/30 items-center justify-between py-4 px-11'>
        <div className='uppercase text-xl'><Link href='/'>Task<span className='text-blue-400'>Collab</span></Link></div>
        {
          session?.user ? 
          (
            <div className='flex items-center gap-x-5'>
              <UserManagementPopUp />
            </div>
          ) 
          :
          (
            <div className='flex items-center gap-x-5'>
                {/* <Link href='/signin'>Princing</Link> */}
                <Link href='/signin'>
                  <Button className='border border-black flex items-center rounded-2xl gap-x-2 text-black hover:text-white bg-slate-100'> <LogIn /> Signin</Button>
                </Link>
                <Link href='/signup'>
                    <Button className=' flex items-center gap-x-2 bg-black text-white rounded-2xl'> <UserPlus2 /> Signup</Button>
                </Link>
            </div>
          )
        }
    </div>
  )
}

export default Nav
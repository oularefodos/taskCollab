import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { LogIn, UserPlus2 } from 'lucide-react'
 
const Nav = () => {
  return (
    <div className='flex items-center justify-between py-4 px-11'>
        <div className='uppercase text-xl'><Link href='/'>Task<span className='text-blue-400'>Collab</span></Link></div>
        <div className='flex items-center gap-x-5'>
            {/* <Link href='/signin'>Princing</Link> */}
            <Link href='/signin'>
                <Button className='border border-black flex items-center gap-x-2 text-black hover:text-white bg-slate-100'> <LogIn /> Signin</Button>
            </Link>
            <Link href='/signup'>
                <Button className=' flex items-center gap-x-2'> <UserPlus2 /> Signup</Button>
            </Link>
        </div>
    </div>
  )
}

export default Nav
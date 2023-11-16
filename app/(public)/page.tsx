import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { BadgeCheck } from 'lucide-react'


const page = () => {
  return (
    <div className='flex items-center justify-center gap-y-5 flex-col h-[100vh] max-w-[900px] m-auto'>
        <div className='min-w-[200px] flex items-center justify-center gap-x-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full p-2 text-center'>
            <BadgeCheck />
            comming soon
        </div>
        <div className='text-3xl lg:text-5xl font-bold text-center'>
            Empower Your Team, Unleash Productivity!
        </div>
        <div className='text-gray-600 text-[18px] text-center '>
            Boost teamwork with TaskCollab. Effortless task management, seamless collaboration. Streamline workflows, meet deadlines, elevate productivity with simplicity
        </div>
        <Link href='/signup'>
            <Button className='bg-black text-white p-4'>Get started for free</Button>
        </Link>
        <div className='mt-6'>
            <h1 className='text-4xl'>How it works ?</h1>
        </div>
    </div>
  )
}

export default page
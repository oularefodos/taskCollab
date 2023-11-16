import Nav from '@/components/Nav'
import React from 'react'

const layout = ({children} : { children : React.ReactNode}) => {
  return (
    <div className='bg-slate-100'>
        <main className='max-w-5xl m-auto p-2'>
            <Nav />
            {children}
        </main>
    </div>
  )
}

export default layout
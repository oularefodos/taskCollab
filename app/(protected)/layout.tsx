
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
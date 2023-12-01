'use client'
import { SessionProvider } from "next-auth/react"

const MysessionProvider = ({children} : {children : React.ReactNode}) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default MysessionProvider
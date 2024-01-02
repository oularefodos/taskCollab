import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { metadataConfig } from '@/config/metadataConfig'
import Nav from '@/components/Nav'
import MysessionProvider from '@/components/SessionProvider'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const poppins = Poppins({ subsets: ['latin'], weight : "600" })

export const metadata: Metadata = {
  title: {
    default : metadataConfig.title,
    template : `%s | ${metadataConfig.title}`
  },
  description: metadataConfig.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <MysessionProvider>
          <main className='bg-white min-h-[100vh] overflow-hidden'>
            <ToastContainer />
            <Nav />
            {children}
          </main>
        </MysessionProvider>
      </body>
    </html>
  )
}

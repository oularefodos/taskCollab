import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { metadataConfig } from '@/config/metadataConfig'
import Nav from '@/components/Nav'
import MysessionProvider from '@/components/SessionProvider'

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
          <main className='bg-gray-50 min-h-[100vh]'>
            <Nav />
            {children}
          </main>
        </MysessionProvider>
      </body>
    </html>
  )
}

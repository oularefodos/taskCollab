import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { metadataConfig } from '@/config/metadataConfig'

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
      <body className={poppins.className}>{children}</body>
    </html>
  )
}

import React from 'react'

import '@/styles/frontend.css'
import { fontHeading, fontSans } from '@/lib/fonts'
import { Toaster } from 'sonner'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontHeading.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}

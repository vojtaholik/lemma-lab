import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'Full of cool stuff!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.className} antialiased dark`}>
      <body className="text-gray-200 max-w-2xl m-auto">
        <main className="p-6 pt-3 md:pt-6 min-h-screen">{children}</main>
      </body>
    </html>
  )
}

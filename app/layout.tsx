import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'Full of cool stuff!',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const posts = await getAllPosts()

  return (
    <html lang="en" className={`${inter.className} antialiased dark`}>
      <body className="text-gray-200 max-w-2xl m-auto">
        <main className="p-6 pt-3 md:pt-6 min-h-screen flex gap-10 w-full max-w-screen-xl mx-auto">
          <aside className="flex flex-col flex-shrink-0">
            <Link href="/">Posts</Link>
            <ul>
              {posts.map(({ id, title }) => {
                return (
                  <li key={id}>
                    <Link
                      className={`border-b text-gray-600 border-gray-300 transition-[border-color] hover:border-gray-600 dark:text-white dark:border-gray-500 dark:hover:border-white`}
                      href="/posts/[id]"
                      as={`/posts/${id}`}
                    >
                      {title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </aside>
          {children}
        </main>
      </body>
    </html>
  )
}

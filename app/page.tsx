import { getAllPosts } from '@/lib/posts'
import { H1 } from './posts/components/h1'
import Link from 'next/link'

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-screen-sm mx-auto">
        <H1>Posts</H1>
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
      </div>
    </main>
  )
}

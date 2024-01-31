import { getPostById, getAllPosts } from '@/lib/posts'
import { H1 } from '@/app/posts/components/h1'
import { Suspense } from 'react'

// Set the title of the page to be the post title, note that we no longer use
// e.g. next/head in app dir
export async function generateMetadata({
  params: { id },
}: {
  params: { id: string }
}) {
  const { title } = await getPostById(id)
  return {
    title,
  }
}

// Generate the post, note that this is a "react server component"! it is allowed to be async
export default async function Post({
  params: { id },
}: {
  params: { id: string }
}) {
  const { mdx, title, date } = await getPostById(id)

  return (
    <article>
      <H1>{title}</H1>
      <time>{date}</time>
      <Suspense fallback={<div>Loading...</div>}>
        <div>{mdx}</div>
      </Suspense>
    </article>
  )
}

// This function can statically allow nextjs to find all the posts that you have made, and statically generate them
export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map((post) => ({
    id: post.id,
  }))
}

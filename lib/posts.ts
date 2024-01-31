import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import { getMDXComponents } from '@/mdx-components'
import { notFound } from 'next/navigation'
import { extractImagesFromMDX } from '@/utils/extract-images-from-mdx'

export async function getPostById(id: string) {
  const realId = id.replace(/\.mdx$/, '')
  const fullPath = join('_posts', `${realId}.mdx`)
  const fileContent = await fs.promises.readFile(fullPath, 'utf8')
  const images = extractImagesFromMDX(fileContent)
  const mdxComponents = getMDXComponents({}, { images })

  try {
    const { content, frontmatter } = await compileMDX<{
      title: string
      date: Date
    }>({
      source: fileContent,
      options: { parseFrontmatter: true },
      components: mdxComponents as any,
    })

    return {
      ...frontmatter,
      title: frontmatter.title,
      id: realId,
      date: `${frontmatter?.date?.toISOString().slice(0, 10)}`,
      mdx: content,
    }
  } catch (e) {
    console.log(e)
    notFound()
  }
}

export async function getAllPosts() {
  const posts = await Promise.all(
    fs.readdirSync('_posts').map((id) => getPostById(id))
  )
  if (posts.length > 0) {
    return posts.sort((post1: any, post2: any) =>
      post1.date > post2.date ? -1 : 1
    )
  } else {
    return []
  }
}

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeParse from 'rehype-parse'
import { visit } from 'unist-util-visit'
import type { Element, Root } from 'hast'

export function extractImagesFromMDX(mdxContent: string): string[] {
  const images: string[] = []
  const htmlContent = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkRehype)
    .use(rehypeStringify)
    .processSync(mdxContent)
    .toString()

  const tree: Root = unified()
    .use(rehypeParse, { fragment: true, emitParseErrors: true })
    .parse(htmlContent)

  visit(tree, 'element', (node: Element) => {
    if (node.tagName === 'img' && node.properties?.src) {
      images.push(node.properties.src.toString())
    }
  })

  return images
}

import { A as a } from '@/app/posts/components/a'
import { P as p } from '@/app/posts/components/p'
import { H1 as h1 } from '@/app/posts/components/h1'
import { H2 as h2 } from '@/app/posts/components/h2'
import { H3 as h3 } from '@/app/posts/components/h3'
import { OL as ol } from '@/app/posts/components/ol'
import { UL as ul } from '@/app/posts/components/ul'
import { LI as li } from '@/app/posts/components/li'
import { HR as hr } from '@/app/posts/components/hr'
import { Code as code } from '@/app/posts/components/code'
// import { Tweet } from 'app/(post)/components/tweet'
import { Image } from '@/app/posts/components/image'
import { Figure } from '@/app/posts/components/figure'
import { Snippet } from '@/app/posts/components/snippet'
import { Caption } from '@/app/posts/components/caption'
import { Callout } from '@/app/posts/components/callout'
import { YouTube } from '@/app/posts/components/youtube'
import { Ref, FootNotes, FootNote } from '@/app/posts/components/footnotes'
import { Blockquote as blockquote } from '@/app/posts/components/blockquote'

export function useMDXComponents(
  components: {
    [component: string]: React.ComponentType
  },
  context: { images: string[] }
) {
  console.log({ context })
  return {
    ...components,
    a,
    h1,
    h2,
    h3,
    p,
    ol,
    ul,
    li,
    hr,
    code,
    pre: Snippet,
    img: (props: any) => Image({ contextImages: context.images, ...props }),
    blockquote,
    // Tweet,
    Image: (props: any) => Image({ contextImages: context.images, ...props }),
    Figure,
    Snippet,
    Caption,
    Callout,
    YouTube,
    Ref,
    FootNotes,
    FootNote,
  }
}

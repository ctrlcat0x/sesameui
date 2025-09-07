import fs from "node:fs"
import path from "node:path"
import { mdxComponents } from "@/mdx-components"
import { compileMDX } from "next-mdx-remote/rsc"

import { Doc, DocPageProps } from "@/types/types"

import { getTableOfContents } from "./toc"

export const CONTENT_DIRECTORY = "src/content/docs"

export async function getDocFromParams(props: DocPageProps): Promise<Doc> {
  // `params` may itself be a Promise in newer Next versions. Resolve it first,
  // then safely resolve `params.slug` which may also be a Promise or string/array.
  const maybeParams = (props as any).params
  const resolvedParams =
    maybeParams && typeof maybeParams.then === "function"
      ? await maybeParams
      : maybeParams || {}

  // `params.slug` may be a Promise as well. Resolve it safely.
  let slug: string[] = []
  const maybeSlug = resolvedParams.slug

  if (Array.isArray(maybeSlug)) {
    slug = maybeSlug
  } else if (typeof maybeSlug === "string") {
    slug = maybeSlug.split("/")
  } else if (maybeSlug && typeof (maybeSlug as any).then === "function") {
    // await if slug is a Promise
    const awaited = await (maybeSlug as any)
    slug = Array.isArray(awaited) ? awaited : String(awaited).split("/")
  } else if (maybeSlug) {
    // fallback: coerce to array and normalize backslashes
    const raw = String(maybeSlug)
    slug = raw.replace(/\\/g, "/").split("/")
  }

  const sourcePath =
    path.join(process.cwd(), CONTENT_DIRECTORY, ...slug) + ".mdx"
  const source = fs.readFileSync(sourcePath, "utf8")

  const toc = await getTableOfContents(source)

  // Use the Next.js component mappings
  const components = mdxComponents()

  const { content, frontmatter } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
    components,
  })

  const slugStr = slug.join("/")

  return {
    slug: slugStr,
    slugAsParams: slugStr,
    _id: slugStr,
    type: "Doc",
    title: String(frontmatter.title),
    description: String(frontmatter.description),
    published: Boolean(frontmatter.published),
    featured: Boolean(frontmatter.featured),
    component: Boolean(frontmatter.component),
    author: String(frontmatter.author),
    toc: toc,
    body: content,
  }
}

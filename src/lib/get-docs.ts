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

  // `params.slug` may be a Promise as well. Resolve it safely and normalize
  // segments so URL-encoded backslashes (%5C) or platform backslashes become
  // forward slashes. This prevents building invalid paths on Windows like
  // `components%5Cimage%5Cparallax-floating.mdx`.
  let slug: string[] = []
  const maybeSlug = resolvedParams.slug

  const normalizeSegment = (s: unknown) =>
    String(s)
      // decode any percent-encoded characters (e.g. %5C -> \)
      .split("/")
      .map((part) => decodeURIComponent(part))
      .join("/")
      // normalize backslashes to forward slashes
      .replace(/\\/g, "/")
      // split into segments and remove empty parts
      .split("/")
      .filter(Boolean)

  if (Array.isArray(maybeSlug)) {
    slug = maybeSlug.flatMap((s) => normalizeSegment(s))
  } else if (typeof maybeSlug === "string") {
    slug = normalizeSegment(maybeSlug)
  } else if (maybeSlug && typeof (maybeSlug as any).then === "function") {
    // await if slug is a Promise
    const awaited = await (maybeSlug as any)
    slug = Array.isArray(awaited)
      ? awaited.flatMap((s) => normalizeSegment(s))
      : normalizeSegment(String(awaited))
  } else if (maybeSlug) {
    // fallback: coerce to array and normalize
    slug = normalizeSegment(String(maybeSlug))
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

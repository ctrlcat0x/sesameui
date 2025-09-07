import fs from "node:fs"
import path from "node:path"
import { NextResponse } from "next/server"

const CONTENT_DIRECTORY = "src/content/docs"

function readAllDocs() {
  const base = path.join(process.cwd(), CONTENT_DIRECTORY)
  const files: Array<{
    slug: string
    title: string
    description?: string
    content: string
  }> = []

  function walk(dir: string, prefix = "") {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full, prefix + entry.name + "/")
      } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
        const slug = (prefix + entry.name).replace(/\.mdx$/, "")
        const raw = fs.readFileSync(full, "utf8")
        // crude frontmatter title extraction
        const titleMatch =
          raw.match(/title:\s*"?([^\n\"]+)"?/) ||
          raw.match(/title:\s*'([^']+)'/)
        const descMatch =
          raw.match(/description:\s*"?([^\n\"]+)"?/) ||
          raw.match(/description:\s*'([^']+)'/)
        const title = titleMatch
          ? titleMatch[1].trim()
          : slug.split("/").pop() || slug
        const description = descMatch ? descMatch[1].trim() : ""
        // strip frontmatter block if present
        const content = raw.replace(/^---[\s\S]*?---/, "")

        files.push({ slug, title, description, content })
      }
    }
  }

  walk(base)
  return files
}

export async function GET() {
  try {
    const docs = readAllDocs()

    // also include components list (names) as quick hits
    const componentsDir = path.join(
      process.cwd(),
      "src",
      "content",
      "docs",
      "components"
    )
    const components: Array<{ name: string; category: string }> = []
    if (fs.existsSync(componentsDir)) {
      const categories = fs
        .readdirSync(componentsDir, { withFileTypes: true })
        .filter(Boolean)
      for (const c of categories) {
        if (!c.isDirectory()) continue
        const files = fs
          .readdirSync(path.join(componentsDir, c.name))
          .filter((f) => f.endsWith(".mdx"))
        for (const f of files) {
          components.push({ name: f.replace(".mdx", ""), category: c.name })
        }
      }
    }

    return NextResponse.json({ docs, components })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

// @ts-ignore
const fs = require("fs")
// @ts-ignore
const path = require("path")

const projectDir = path.join(__dirname, "..", "..")
const DOCS_DIRECTORY = "/src/content/docs/"
const outputPath = path.join(projectDir, "public", "llms.txt")

interface DocFile {
  path: string
  title: string
  description: string
  category: string
  slug: string
}

function getAllDocFiles(): DocFile[] {
  const contentDir = path.join(projectDir, DOCS_DIRECTORY)
  const allFiles: DocFile[] = []

  function traverseDirectory(dir: string, currentPath: string[] = []) {
    const files = fs.readdirSync(dir)

    files.forEach((file: string) => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        traverseDirectory(filePath, [...currentPath, file])
      } else if (file.endsWith(".mdx")) {
        try {
          const source = fs.readFileSync(filePath, "utf8")

          // Extract frontmatter
          const frontmatterMatch = source.match(/^---\n([\s\S]*?)\n---/)
          const frontmatter = frontmatterMatch ? frontmatterMatch[1] : ""

          const title =
            frontmatter.match(/title:\s*(.+)/)?.[1]?.replace(/['"]/g, "") || ""
          const description =
            frontmatter
              .match(/description:\s*(.+)/)?.[1]
              ?.replace(/['"]/g, "") || ""

          if (title) {
            const fileName = file.replace(".mdx", "")
            const slug = [...currentPath, fileName].join("/")
            const category =
              currentPath.length > 0 ? currentPath[0] : "getting-started"

            allFiles.push({
              path: filePath,
              title,
              description,
              category,
              slug,
            })
          }
        } catch (error) {
          console.error(`Error reading ${filePath}:`, error)
        }
      }
    })
  }

  traverseDirectory(contentDir)
  return allFiles
}

function categorizeFiles(files: DocFile[]) {
  const categories: Record<string, DocFile[]> = {}

  files.forEach((file) => {
    if (!categories[file.category]) {
      categories[file.category] = []
    }
    categories[file.category].push(file)
  })

  // Sort files within each category
  Object.keys(categories).forEach((category) => {
    categories[category].sort((a, b) => a.title.localeCompare(b.title))
  })

  return categories
}

function generateLlmsTxt(categories: Record<string, DocFile[]>): string {
  let llmsTxt = ""

  // Header
  llmsTxt += "# Sesame Components\n\n"

  // Description
  llmsTxt +=
    "> A curated collection of playful, composable UI components and microinteractions for React projects. Built with React, TypeScript, Tailwind CSS, and Motion (Framer Motion).\n\n"

  // Overview
  llmsTxt +=
    "Sesame provides copy-paste-ready components and small microinteractions inspired by creative, award-winning web experiences. All components are open source and free for personal and commercial use.\n\n"

  // Getting Started section
  if (categories["getting-started"]) {
    llmsTxt += "## Getting Started\n\n"
    categories["getting-started"].forEach((file) => {
      const url = `https://sesameui.vercel.app/docs/${file.slug}.md`
      llmsTxt += `- [${file.title}](${url})`
      if (
        file.description &&
        file.description !== "null" &&
        file.description.trim()
      ) {
        llmsTxt += `: ${file.description}`
      }
      llmsTxt += "\n"
    })
    llmsTxt += "\n"
  }

  // Component categories
  const componentCategories = Object.keys(categories)
    .filter((cat) => cat !== "getting-started")
    .sort()

  componentCategories.forEach((categoryKey) => {
    const files = categories[categoryKey]
    if (files.length === 0) return

    // Format category name
    const categoryName = categoryKey
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    llmsTxt += `## ${categoryName}\n\n`

    files.forEach((file) => {
      // Point component links to the local sesame docs site
      const url = `https://sesameui.vercel.app/docs/${file.slug}.md`
      llmsTxt += `- [${file.title}](${url})`
      if (
        file.description &&
        file.description !== "null" &&
        file.description.trim()
      ) {
        llmsTxt += `: ${file.description}`
      }
      llmsTxt += "\n"
    })
    llmsTxt += "\n"
  })

  // Additional Resources
  llmsTxt += "## Additional Resources\n\n"
  llmsTxt +=
    "- [GitHub Repository](https://github.com/ctrlcat0x/sesameui): Source code and contributions\n"
  llmsTxt +=
    "- Interactive documentation: https://sesameui.vercel.app/docs (live examples)\n"
  llmsTxt +=
    "- Installation Guide: https://sesameui.vercel.app/docs/installation\n"
  llmsTxt += "- Changelog: https://sesameui.vercel.app/docs/changelog\n\n"

  // Footer
  llmsTxt += "---\n\n"
  llmsTxt +=
    "All components are available in both interactive format (for developers) and markdown format (for LLMs and documentation tools). "
  llmsTxt +=
    "Simply append `.md` to any documentation URL to access the markdown version.\n"

  return llmsTxt
}

async function buildLlmsTxt() {
  console.log("Building llms.txt file...")

  try {
    // Get all documentation files
    const files = getAllDocFiles()
    console.log(`Found ${files.length} documentation files`)

    // Categorize files
    const categories = categorizeFiles(files)
    console.log(
      `Organized into categories: ${Object.keys(categories).join(", ")}`
    )

    // Generate llms.txt content
    const llmsTxtContent = generateLlmsTxt(categories)

    // Write to public folder
    fs.writeFileSync(outputPath, llmsTxtContent)

    console.log(`✓ Generated llms.txt with ${files.length} components`)
    console.log(`✓ File saved to: ${outputPath}`)
  } catch (error) {
    console.error("✗ Failed to build llms.txt:", error)
    throw error
  }
}

buildLlmsTxt()

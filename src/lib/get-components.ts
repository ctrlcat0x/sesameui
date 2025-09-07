import fs from "node:fs"
import path from "node:path"

export const COMPONENTS_DIRECTORY = "src/content/docs/components"

export interface Component {
  name: string
  category: string
  thumbnail: {
    url: string
  }
  demo: {
    url: string
  }
}

export function getAllComponentNames(): string[] {
  const componentsPath = path.join(process.cwd(), COMPONENTS_DIRECTORY)
  const categories = fs
    .readdirSync(componentsPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  const componentNames: string[] = []

  for (const category of categories) {
    const categoryPath = path.join(componentsPath, category)
    const files = fs
      .readdirSync(categoryPath)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(".mdx", ""))

    componentNames.push(...files)
  }

  return componentNames
}

export function getAllComponents(): Component[] {
  const componentsPath = path.join(process.cwd(), COMPONENTS_DIRECTORY)
  const categories = fs
    .readdirSync(componentsPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  const components: Component[] = []

  for (const category of categories) {
    const categoryPath = path.join(componentsPath, category)
    const files = fs
      .readdirSync(categoryPath)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(".mdx", ""))

    for (const componentName of files) {
      // Build thumbnail and demo URLs with safe fallbacks
      const cdn = process.env.BUNNY_CDN_URL

      // Prefer CDN if configured
      let thumbnailUrl = cdn
        ? `${cdn}/thumbnails/${componentName}.jpg`
        : undefined
      let demoUrl = cdn ? `${cdn}/demos/${componentName}.mp4` : undefined

      // If no CDN, prefer local public assets when present
      if (!cdn) {
        const localThumbPath = path.join(
          process.cwd(),
          "public",
          "thumbnails",
          `${componentName}.jpg`
        )
        if (fs.existsSync(localThumbPath)) {
          thumbnailUrl = `/thumbnails/${componentName}.jpg`
        } else {
          // fallback to site og or generic image in public
          thumbnailUrl = "/og.jpg"
        }

        const localDemoPath = path.join(
          process.cwd(),
          "public",
          "demos",
          `${componentName}.mp4`
        )
        if (fs.existsSync(localDemoPath)) {
          demoUrl = `/demos/${componentName}.mp4`
        } else {
          demoUrl = ""
        }
      }

      components.push({
        name: componentName,
        category: category,
        thumbnail: {
          url: thumbnailUrl!,
        },
        demo: {
          url: demoUrl!,
        },
      })
    }
  }

  return components
}

export function getComponentByName(name: string): Component | undefined {
  const componentsPath = path.join(process.cwd(), COMPONENTS_DIRECTORY)
  const categories = fs
    .readdirSync(componentsPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  for (const category of categories) {
    const categoryPath = path.join(componentsPath, category)
    const files = fs
      .readdirSync(categoryPath)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(".mdx", ""))

    if (files.includes(name)) {
      const cdn = process.env.BUNNY_CDN_URL

      let thumbnailUrl = cdn ? `${cdn}/thumbnails/${name}.jpg` : undefined
      let demoUrl = cdn ? `${cdn}/demos/${name}.mp4` : undefined

      if (!cdn) {
        const localThumbPath = path.join(
          process.cwd(),
          "public",
          "thumbnails",
          `${name}.jpg`
        )
        if (fs.existsSync(localThumbPath)) {
          thumbnailUrl = `/thumbnails/${name}.jpg`
        } else {
          thumbnailUrl = "/og.jpg"
        }

        const localDemoPath = path.join(
          process.cwd(),
          "public",
          "demos",
          `${name}.mp4`
        )
        if (fs.existsSync(localDemoPath)) {
          demoUrl = `/demos/${name}.mp4`
        } else {
          demoUrl = ""
        }
      }

      return {
        name: name,
        category: category,
        thumbnail: {
          url: thumbnailUrl!,
        },
        demo: {
          url: demoUrl!,
        },
      }
    }
  }

  return undefined
}

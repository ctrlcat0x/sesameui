"use client"

import React, { useEffect, useRef, useState } from "react"
import {
  File as LucideFile,
  Search as LucideSearch,
  X as LucideX,
} from "lucide-react"

type DocItem = {
  slug: string
  title: string
  description?: string
  content: string
}
type ComponentItem = { name: string; category: string }

// We'll dynamically import Fuse inside the search effect if available.

function highlight(text: string, q: string) {
  if (!q) return text
  const parts = text.split(
    new RegExp(`(${q.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "ig")
  )
  return parts
    .map((p, i) =>
      p.toLowerCase() === q.toLowerCase()
        ? `<span style="background:transparent;color:inherit">${p}</span>`
        : p
    )
    .join("")
}

export default function LocalSearch() {
  const [index, setIndex] = useState<{
    docs: DocItem[]
    components: ComponentItem[]
  } | null>(null)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(0)
  const resultsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((data) => setIndex(data))
      .catch(() => setIndex({ docs: [], components: [] }))
  }, [])

  useEffect(() => {
    if (!index) return
    const q = query.trim()
    if (!q) {
      setResults([])
      setSelected(0)
      return
    }

    // Try dynamic import of Fuse.js (handles both ESM default and CJS exports).
    ;(async () => {
      try {
        const mod = await import("fuse.js")
        const FuseCtor = (mod && (mod as any).default) || mod
        if (FuseCtor) {
          const fuse = new (FuseCtor as any)(
            [
              ...index.docs.map((d) => ({ ...d, __type: "doc" })),
              ...index.components.map((c) => ({ ...c, __type: "component" })),
            ],
            {
              keys: ["title", "description", "content", "name", "category"],
              includeMatches: true,
              threshold: 0.4,
            }
          )
          const out = fuse
            .search(q)
            .slice(0, 20)
            .map((r: any) => ({ item: r.item, matches: r.matches }))
          // map to hit format
          const hits = out.map((r: any) => {
            if (r.item.__type === "component") {
              const comp = r.item as ComponentItem
              return {
                url: `/docs/components/${comp.category}/${comp.name}`,
                hierarchy: {
                  lvl0: "Components",
                  lvl1: comp.category,
                  lvl2: comp.name,
                },
                content: "",
                type: "component",
                _matches: r.matches,
              }
            }
            const doc = r.item as DocItem
            return {
              url: `/docs/${doc.slug}`,
              hierarchy: { lvl0: "Docs", lvl1: doc.title },
              content: doc.content.slice(0, 400),
              type: "doc",
              _matches: r.matches,
            }
          })
          setResults(hits)
          setSelected(0)
          return
        }
      } catch (e) {
        // dynamic import failed — fall back to simple scorer below
      }
    })()

    // fallback simple scorer
    function scoreQuery(text: string, q: string) {
      const t = text.toLowerCase()
      const qq = q.toLowerCase()
      if (t === qq) return 100
      if (t.startsWith(qq)) return 80
      if (t.includes(qq)) return 50
      const tokens = t.split(/[^a-z0-9]+/)
      for (const tok of tokens) {
        if (tok.startsWith(qq)) return 40
      }
      return 0
    }

    const docScores = index.docs.map((d) => {
      const s = Math.max(
        scoreQuery(d.title, q),
        scoreQuery(d.description || "", q),
        scoreQuery(d.content.slice(0, 500), q)
      )
      return { type: "doc", score: s, item: d }
    })
    const compScores = index.components.map((c) => {
      const s = Math.max(scoreQuery(c.name, q), scoreQuery(c.category, q))
      return { type: "component", score: s, item: c }
    })
    const merged = [...docScores, ...compScores]
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
    const hits = merged.map((m) => {
      if (m.type === "component") {
        const comp = m.item as ComponentItem
        return {
          url: `/docs/components/${comp.category}/${comp.name}`,
          hierarchy: {
            lvl0: "Components",
            lvl1: comp.category,
            lvl2: comp.name,
          },
          content: "",
          type: "component",
        }
      }
      const doc = m.item as DocItem
      return {
        url: `/docs/${doc.slug}`,
        hierarchy: { lvl0: "Docs", lvl1: doc.title },
        content: doc.content.slice(0, 400),
        type: "doc",
      }
    })
    setResults(hits)
    setSelected(0)
  }, [index, query])

  // keyboard open shortcut: Cmd/Ctrl+K
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen(true)
        setTimeout(() => inputRef.current?.focus(), 50)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelected((s) => Math.min(s + 1, results.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelected((s) => Math.max(s - 1, 0))
      } else if (e.key === "Enter") {
        e.preventDefault()
        const hit = results[selected]
        if (hit) window.location.href = hit.url
      } else if (e.key === "Escape") {
        setOpen(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, results, selected])

  // Keep selected within bounds when results change
  useEffect(() => {
    if (selected >= results.length) {
      setSelected(Math.max(0, results.length - 1))
    }
  }, [results, selected])

  // Scroll the selected item into view within the results container
  useEffect(() => {
    if (!resultsRef.current) return
    const el = resultsRef.current.querySelector(
      `[data-index=\"${selected}\"]`
    ) as HTMLElement | null
    if (el) {
      // scroll the item into view, nearest keeps it within viewport without jumping
      el.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "smooth",
      })
    }
  }, [selected, results, open])

  return (
    <>
      <button
        onClick={() => {
          setOpen(true)
          setTimeout(() => inputRef.current?.focus(), 50)
        }}
        className="inline-flex items-center gap-2 bg-input rounded-2xl p-2"
        aria-label="Open search"
      >
        <LucideSearch className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Search documentation...
        </span>
        <div className="ml-16 text-xs text-muted-foreground bg-secondary/20 rounded-lg p-1 border">
          <kbd className="px-2 py-1">Ctrl + K</kbd>
        </div>
      </button>

      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-card border border-border rounded-xl shadow-xl z-[10000]">
            <div className="flex items-center gap-2 p-4">
              <LucideSearch className="w-4 h-4 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documentation..."
                className="bg-transparent outline-none w-full text-sm"
                aria-label="Search documentation"
              />
              <button
                onClick={() => {
                  setOpen(false)
                  setQuery("")
                }}
                className="p-1"
              >
                <LucideX className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div
              ref={resultsRef}
              className="max-h-[60vh] overflow-y-auto m-2 rounded-lg border border-border"
            >
              {results.length === 0 && query ? (
                <div className="p-4 text-muted-foreground">No results</div>
              ) : (
                results.map((hit, i) => (
                  <div
                    key={i}
                    data-index={i}
                    className={`cursor-pointer ${i === selected ? "bg-input/60" : ""}`}
                    onClick={() => (window.location.href = hit.url)}
                  >
                    <div className="flex items-center p-3 gap-3">
                      <div className="w-8 flex-shrink-0 flex items-center justify-center text-muted-foreground">
                        <LucideFile className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium truncate">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: hit.hierarchy?.lvl1
                                ? query
                                  ? highlight(hit.hierarchy.lvl1, query)
                                  : hit.hierarchy.lvl1
                                : query
                                  ? highlight(
                                      hit._snippetResult?.content?.value ||
                                        hit.content ||
                                        "",
                                      query
                                    )
                                  : hit._snippetResult?.content?.value ||
                                    hit.content ||
                                    "",
                            }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {hit.hierarchy?.lvl2 || hit.hierarchy?.lvl1}
                        </div>
                      </div>
                      <div className="flex items-center flex-shrink-0 pl-3">
                        {i === selected && (
                          <kbd className="inline-flex items-center justify-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                            Enter
                          </kbd>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

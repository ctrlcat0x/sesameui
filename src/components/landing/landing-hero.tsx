"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { LayoutGroup, motion } from "motion/react"

import TextRotate from "@/fancy/components/text/text-rotate"

import { ScramblePreview } from "./typewriter-scramble"

export function LandingHero() {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    fetch("https://api.github.com/repos/ctrlcat0x/sesameui")
      .then((res) => res.json())
      .then((data) => {
        setStars(data.stargazers_count)
      })
      .catch(() => {
        // Fallback to null if API fails
        setStars(null)
      })
  }, [])
  return (
    <section className="w-full mt-8 mb-32 flex justify-center">
      {/* Container: 90vh height, 95vw width, centered - now using flex layout */}
      <div
        className="bento-container flex flex-col"
        style={{ width: "95vw", height: "90vh", padding: "1rem", gap: "1rem" }}
      >
        {/* Top row */}
        <div className="flex w-full" style={{ height: "30vh", gap: "1rem" }}>
          <div
            className="rounded-xl border p-6 bento-tile overflow-hidden flex flex-col justify-center"
            style={{ width: "40vw", height: "30vh" }}
          >
            <h2 className="text-6xl font-calendas mb-4 leading-tight">
              Sesame components
            </h2>
            <p className="text-lg mb-4">
              ShadCN Components • Motion Design • GSAP
            </p>
            <ul className="text-sm space-y-1 list-disc pl-5">
              <li>Styled using Tailwind CSS</li>
              <li>Accessible building blocks</li>
              <li>Micro-interactions & motion</li>
              <li>Open source & fast to customize</li>
              <li>Fully customizable, open code</li>
            </ul>
          </div>

          <div
            className="rounded-xl border p-6 bento-tile  overflow-hidden flex flex-col justify-between relative group"
            style={{ width: "55vw", height: "30vh" }}
          >
            {/* Hero content */}
            <div className="flex items-start justify-between">
              <div>
                <motion.h1
                  className="text-3xl md:text-5xl lg:text-6xl font-calendas leading-tight"
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25, delay: 0.1 }}
                >
                  <span className="block text-glow">Let's sprinkle</span>
                  <LayoutGroup>
                    <motion.span layout className="flex whitespace-pre">
                      <motion.span
                        layout
                        className="flex whitespace-pre text-glow"
                        transition={{
                          type: "spring",
                          damping: 30,
                          stiffness: 400,
                        }}
                      >
                        some{" "}
                      </motion.span>
                      <TextRotate
                        texts={["magic", "love ♥", "fun", "cool"]}
                        mainClassName="overflow-hidden pr-2 text-blue dark:text-blue-500 text-glow2"
                        staggerDuration={0.03}
                        staggerFrom="last"
                        rotationInterval={3000}
                        transition={{
                          type: "spring",
                          damping: 30,
                          stiffness: 400,
                        }}
                      />
                    </motion.span>
                  </LayoutGroup>
                </motion.h1>
                <p className="text-base mt-2">
                  A growing library of ready-to-use React components.
                </p>
              </div>
              <div />
            </div>

            <div className="flex gap-3">
              <Link
                href="/docs/introduction"
                className="bg-foreground text-background px-3 py-2 rounded-md text-sm"
              >
                View components
              </Link>
              <Link
                href="https://github.com/ctrlcat0x/sesameui"
                className="bg-blue text-white px-3 py-2 rounded-md text-sm flex items-center gap-2"
              >
                <span>Star us on GitHub</span>
                <span className="font-display inline-block tracking-wider tabular-nums bg-white/10 px-2 py-0.5 rounded">
                  ({stars ?? "—"})
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="flex w-full"
          style={{ gap: "1rem", alignItems: "flex-start" }}
        >
          <div
            className="bento-tile rounded-xl border p-6 relative group"
            style={{ width: "20vw", height: "60vh" }}
          >
            <Link
              href="#"
              className="absolute top-3 right-3 text-sm flex items-center gap-2 text-gray-500 dark:text-gray-300 transition-colors"
            >
              <span className="leading-none">example component name</span>
              <ArrowRight
                className="transform -rotate-45 group-hover:rotate-0 transition-transform"
                size={14}
              />
            </Link>
            <h3 className="font-medium mb-2">Component 2</h3>
            <p className="text-sm">
              Placeholder for another tall panel — try images, videos, or
              interactive previews.
            </p>
          </div>

          {/* Center column: Component 3 on top, two buttons below */}
          <div className="flex flex-col" style={{ width: "55vw", gap: "1rem" }}>
            <div
              className="bento-tile rounded-xl border p-6 relative group"
              style={{ height: "30vh" }}
            >
              <Link
                href="#"
                className="absolute top-3 right-3 text-sm flex items-center gap-2 text-gray-500 dark:text-gray-300 transition-colors"
              >
                <span className="leading-none">example component name</span>
                <ArrowRight
                  className="mt-1 transform -rotate-45 group-hover:rotate-0 transition-transform"
                  size={14}
                />
              </Link>
              <h3 className="font-medium mb-2">Component 3</h3>
              <p className="text-sm">
                A wide, short component ideal for feature highlights or demos.
                Add richer content here to showcase interactions.
              </p>
            </div>

            <div className="flex" style={{ gap: "1rem" }}>
              <div
                className="bento-tile rounded-xl border p-4 relative group"
                style={{ width: "27.5vw", height: "28.5vh" }}
              >
                <Link
                  href="#"
                  className="absolute top-3 right-3 text-sm flex items-center gap-2 text-gray-500 dark:text-gray-300 transition-colors"
                >
                  <span className="leading-none">scramble on hover</span>
                  <ArrowRight
                    className="transform -rotate-45 group-hover:rotate-0 transition-transform"
                    size={14}
                  />
                </Link>
                <ScramblePreview />
              </div>
              <div
                className="bento-tile rounded-xl border p-4 relative group"
                style={{ width: "27.5vw", height: "28.5vh" }}
              >
                <Link
                  href="#"
                  className="absolute top-3 right-3 text-sm flex items-center gap-2 text-gray-500 dark:text-gray-300 transition-colors"
                >
                  <span className="leading-none">example component name</span>
                  <ArrowRight
                    className="transform -rotate-45 group-hover:rotate-0 transition-transform"
                    size={14}
                  />
                </Link>
                <h4 className="font-medium mb-2">Button Component B</h4>
                <p className="text-sm">
                  Another variant: icon, label, and motion-ready.
                </p>
              </div>
            </div>
          </div>

          {/* Right tall column */}
          <div
            className="bento-tile rounded-xl border p-6 relative group"
            style={{ width: "20vw", height: "60vh" }}
          >
            <Link
              href="#"
              className="absolute top-3 right-3 text-sm flex items-center gap-2 text-gray-500 dark:text-gray-300 transition-colors"
            >
              <span className="leading-none">example component name</span>
              <ArrowRight
                className="transform -rotate-45 group-hover:rotate-0 transition-transform"
                size={14}
              />
            </Link>
            <h3 className="font-medium mb-2">Component 4</h3>
            <p className="text-sm">
              Placeholder for another tall panel — try images, videos, or
              interactive previews.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { LayoutGroup, motion } from "motion/react"

import TextRotate from "@/fancy/components/text/text-rotate"

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
    <section className="w-full mt-32 overflow-hidden md:overflow-visible flex flex-col items-center relative">
      <div className=" flex flex-col justify-center items-center z-50 pointer-events-auto">
        <motion.div
          className="my-12"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
        >
          <Link
            href="https://github.com/ctrlcat0x/sesameui"
            target="_blank"
            className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
          >
            <span className="text-foreground text-sm">
              Proudly Open Source on GitHub
            </span>
            <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

            <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
              <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                <span className="flex size-6">
                  <ArrowRight className="m-auto size-3" />
                </span>
                <span className="flex size-6">
                  <ArrowRight className="m-auto size-3" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
        <motion.h1
          className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight font-calendas tracking-tight space-y-1 md:space-y-4"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
        >
          <span className="text-glow">Make your </span>
          <LayoutGroup>
            <motion.span layout className="flex whitespace-pre">
              <motion.span
                layout
                className="flex whitespace-pre text-glow"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              >
                website{" "}
              </motion.span>

              <TextRotate
                texts={[
                  "lovely ♥",
                  "fun",
                  "weird",
                  "funky",
                  "sexy",
                  "cool",
                  "over-animated?",
                  "pop",
                  "rock",
                ]}
                mainClassName="overflow-hidden pr-3 text-blue dark:text-blue-500 py-0 pb-2 md:pb-4 rounded-xl text-glow2"
                staggerDuration={0.03}
                staggerFrom="last"
                rotationInterval={3000}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              />
            </motion.span>
          </LayoutGroup>
        </motion.h1>
        <motion.p
          className="text-sm sm:text-lg md:text-xl lg:text-2xl text-center font-overused-grotesk pt-4 sm:pt-8 md:pt-10 lg:pt-12"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
        >
          with a growing library of ready-to-use react components &
          microinteractions. free & open source.
        </motion.p>

        <div className="flex flex-row justify-center space-x-4 items-center mt-10 sm:mt-16 md:mt-20 lg:mt-20 text-xs">
          <motion.button
            className="w-28 sm:w-32 md:w-36 lg:w-40 sm:text-base md:text-lg lg:text-xl font-medium tracking-tight text-background bg-foreground px-3 py-1.5 sm:px-4 sm:py-2 md:px-4 md:py-2 lg:px-5 lg:py-2.5 rounded-lg md:rounded-xl z-20 shadow-2xl whitespace-nowrap cursor-pointer"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              delay: 0.7,
              scale: {
                duration: 0.2,
              },
            }}
            whileTap={{ scale: 0.95 }}
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", damping: 30, stiffness: 400 },
            }}
          >
            <Link href="/docs/introduction">
              Check docs <span className="font-serif ml-1">→</span>
            </Link>
          </motion.button>
          <motion.button
            className=" sm:text-base md:text-lg lg:text-xl font-medium tracking-tight text-white bg-blue dark:bg-blue-500 px-3 py-1.5 sm:px-4 sm:py-2 md:px-4 md:py-2 lg:px-5 lg:py-2.5 rounded-lg md:rounded-xl z-20 shadow-2xl whitespace-nowrap cursor-pointer"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              delay: 0.7,
              scale: {
                duration: 0.2,
              },
            }}
            whileTap={{ scale: 0.95 }}
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", damping: 30, stiffness: 400 },
            }}
          >
            <Link href="https://github.com/ctrlcat0x/sesameui">
              Star us on GitHub ({" "}
              <span className="font-display inline-block tracking-wider tabular-nums">
                {stars}
              </span>
              )
            </Link>
          </motion.button>
        </div>
      </div>
    </section>
  )
}

"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

export default function ContentSection() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
        <Image
          className="rounded-xl grayscale"
          src="https://images.unsplash.com/photo-1635776062360-af423602aff3?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Open source community collaboration"
          height={400}
          width={1000}
          quality={90}
          priority
        />

        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <h2 className="from-foreground to-foreground/70 bg-gradient-to-br bg-clip-text text-4xl font-bold text-transparent lg:text-5xl">
            Building the future of UI development together
          </h2>
          <div className="space-y-6">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Sesame UI is more than just components. It's a complete ecosystem
              designed to make building beautiful, accessible interfaces a
              breeze. Polished animations to create exceptional user
              experiences.
            </p>
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
                Learn More <span className="font-serif ml-1">→</span>
              </Link>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

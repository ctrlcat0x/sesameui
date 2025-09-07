"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"

import { cn } from "@/lib/utils"

interface ComponentCardProps {
  component: {
    name: string
    category: string
    thumbnail: { url: string }
    demo: { url: string }
  }
}

export default function ComponentCard({ component }: ComponentCardProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link
        href={`/docs/components/${component.category}/${component.name}`}
        className="group relative aspect-video rounded-xl overflow-hidden border block"
      >
        {/* Thumbnail Image */}
        {component.thumbnail?.url ? (
          <Image
            src={component.thumbnail.url}
            alt={component.name}
            fill
            className="object-cover group-hover:opacity-0"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}
        {/* Video on Hover */}
        {component.demo?.url ? (
          <video
            src={component.demo.url}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={handleVideoLoaded}
            className={cn(
              "absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-0",
              isVideoLoaded && "group-hover:opacity-100"
            )}
          />
        ) : null}
      </Link>
    </motion.div>
  )
}

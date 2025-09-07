import Image from "next/image"
import Link from "next/link"

import contributors from "@/lib/contributors"
import { Button } from "@/components/ui/button"

export default function CommunitySection() {
  return (
    <section className="pt-16 md:pt-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="from-foreground to-foreground/70 bg-gradient-to-br bg-clip-text text-4xl font-bold text-transparent lg:text-5xl">
            Built by the Community <br /> for the Community
          </h2>
          <p className="text-muted-foreground mt-6 text-lg">
            Join a growing community of developers building beautiful interfaces
            with Sesame UI.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg grid-cols-3 gap-4 sm:grid-cols-6">
          {contributors.map((contributor) => (
            <Link
              key={contributor.github}
              href={`https://github.com/${contributor.github}`}
              target="_blank"
              rel="noopener noreferrer"
              title={contributor.name}
              className="size-16 overflow-hidden rounded-full border transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <Image
                alt={`${contributor.name}'s avatar`}
                src={contributor.avatar}
                width={64}
                height={64}
                className="size-full object-cover"
              />
            </Link>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="https://github.com/ctrlcat0x/sesameui/contributors">
              View All Contributors
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

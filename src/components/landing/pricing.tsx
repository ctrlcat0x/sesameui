import Link from "next/link"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Pricing() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h1 className="text-center text-4xl font-semibold lg:text-5xl">
            Simple, transparent pricing
          </h1>
          <p>
            Access our comprehensive library of UI components and templates to
            build beautiful, responsive web applications faster than ever.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-3">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-md font-medium">
                Community Plan
              </CardTitle>
              <span className="my-3 block text-2xl font-semibold">$0</span>
              <CardDescription className="text-sm">
                Free forever
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <hr className="border-dashed" />

              <ul className="list-outside space-y-3 text-sm">
                {[
                  "All UI Components",
                  "Documentation & Examples",
                  "Community Support",
                  "Regular Updates",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="mt-auto">
              <Button asChild variant="default" className="w-full ">
                <Link href="">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="relative">
            <span className="text-foreground bg-accent ring-primary-foreground/20 absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full bg-linear-to-br/increasing px-3 py-2 text-xs font-medium ring-1 ring-offset-1 ring-offset-gray-950 ring-inset">
              Popular
            </span>
            <div className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-md font-medium">
                  Professional Plan
                </CardTitle>
                <span className="my-3 block text-2xl font-semibold">
                  $49.99 / yr
                </span>
                <CardDescription className="text-sm">
                  Section templates + complete website templates
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <hr className="border-dashed" />
                <ul className="list-outside space-y-3 text-sm">
                  {[
                    "Everything in Community",
                    "Pre-built Section Templates",
                    "Complete Website Templates",
                    "Hero & Feature Sections",
                    "Pricing & Contact Sections",
                    "Footer & Navigation Templates",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="size-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                {/* Add after payment integration */}
                <Button disabled variant="outline" className="w-full">
                  Coming Soon
                </Button>
              </CardFooter>
            </div>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-md font-medium">
                Commissioned Work
              </CardTitle>
              <span className="my-3 block text-2xl font-semibold">
                Custom Pricing
              </span>
              <CardDescription className="text-sm">
                Paid custom design, development and component requests
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <hr className="border-dashed" />

              <ul className="list-outside space-y-3 text-sm">
                {[
                  "Custom UI/UX design and mockups",
                  "Custom development (React/Tailwind)",
                  "Build full website templates",
                  "Request new components or features",
                  "Estimates, scoping and delivery timelines",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="mt-auto">
              <Button asChild variant="default" className="w-full">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

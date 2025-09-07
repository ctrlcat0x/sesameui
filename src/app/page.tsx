import ContentSection from "@/components/landing/about"
import CommunitySection from "@/components/landing/community"
import { LandingHero } from "@/components/landing/landing-hero"
import Pricing from "@/components/landing/pricing"
import EmailClient from "@/components/landing/showcase"

export default function Home() {
  return (
    <div className="">
      <LandingHero />
      <EmailClient />
      <ContentSection />
      <Pricing />
      <CommunitySection />
    </div>
  )
}

import { Benefits } from '@/components/Benefits'
import { Faq } from '@/components/Faq'
import { Features } from '@/components/Features'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import { Pricing } from '@/components/Pricing'
import { Testimonials } from '@/components/Testimonials'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export default function Kiwify() {
  return (
    <>
      <Navbar isKiwify={true} />
      <Hero isKiwify={true} />
      <Features />
      <Benefits />
      <Testimonials />
      <Pricing isKiwify={true} />
      <Faq />
      <Footer />
      <WhatsAppButton />
    </>
  )
} 
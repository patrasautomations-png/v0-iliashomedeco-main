import { Navigation } from '@/components/sections/navigation'
import { Hero } from '@/components/sections/hero'
import { Philosophy } from '@/components/sections/philosophy'
import { Collections } from '@/components/sections/collections'
import { Portfolio } from '@/components/sections/portfolio'
import { ContactForm } from '@/components/sections/contact-form'
import { Footer } from '@/components/sections/footer'

export default function HomePage() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Philosophy />
      <Collections />
      <Portfolio />
      <ContactForm />
      <Footer />
    </main>
  )
}

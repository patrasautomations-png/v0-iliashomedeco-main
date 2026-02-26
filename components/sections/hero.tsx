'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background Image (video replacement) */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-fallback.jpg"
          alt="Luxury Mediterranean villa interior"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/60" />
      </div>

      {/* House Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]">
        <svg
          viewBox="0 0 200 200"
          className="size-[600px]"
          fill="currentColor"
        >
          <path
            d="M100 20L20 90V180H75V130H125V180H180V90L100 20Z"
            className="text-primary-foreground"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gold"
        >
          Kefalonia, Greece
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 font-serif text-4xl font-bold leading-tight text-primary-foreground md:text-6xl lg:text-7xl"
        >
          <span className="text-balance">
            {'Give your home the '}
            <span className="text-gold">ILIAS Home Collections</span>
            {' signature'}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-primary-foreground/70"
        >
          Premium furniture, bespoke curtains, and complete interior design
          solutions crafted for Mediterranean living.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-sm border-2 border-gold bg-transparent px-8 py-4 text-sm font-semibold uppercase tracking-widest text-gold transition-all duration-300 hover:bg-gold hover:text-charcoal hover:shadow-[0_0_30px_rgba(184,134,11,0.4)]"
          >
            Book a Free Home Consultation
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#philosophy"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-label="Scroll to next section"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="size-6 text-gold/60" />
        </motion.div>
      </motion.a>
    </section>
  )
}

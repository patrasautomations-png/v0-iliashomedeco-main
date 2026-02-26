'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Ruler, Palette, Award } from 'lucide-react'
import { PHILOSOPHY_STEPS } from '@/lib/constants'

const iconMap = {
  Ruler,
  Palette,
  Award,
} as const

export function Philosophy() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="philosophy"
      ref={ref}
      className="relative overflow-hidden bg-charcoal py-24 lg:py-32"
    >
      {/* Subtle parallax background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
        <svg
          viewBox="0 0 200 200"
          className="absolute -right-20 top-10 size-[500px]"
          fill="currentColor"
        >
          <path
            d="M100 20L20 90V180H75V130H125V180H180V90L100 20Z"
            className="text-primary-foreground"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-gold">
            Our Approach
          </p>
          <h2 className="font-serif text-3xl font-bold text-primary-foreground md:text-5xl">
            <span className="text-balance">Three Steps to Your Dream Space</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {PHILOSOPHY_STEPS.map((step, index) => {
            const Icon = iconMap[step.icon]
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative flex flex-col items-center rounded-lg border border-primary-foreground/10 bg-charcoal-light/50 p-8 text-center transition-all duration-300 hover:border-gold/30 hover:shadow-[0_0_30px_rgba(184,134,11,0.1)]"
              >
                <div className="mb-6 flex size-16 items-center justify-center rounded-full border border-gold/30 transition-all duration-300 group-hover:border-gold group-hover:shadow-[0_0_20px_rgba(184,134,11,0.2)]">
                  <Icon className="size-7 text-gold" strokeWidth={1.5} />
                </div>

                <span className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-gold/60">
                  {`Step ${index + 1}`}
                </span>

                <h3 className="mb-2 font-serif text-2xl font-semibold text-primary-foreground">
                  {step.title}
                </h3>

                <p className="mb-4 text-sm font-medium text-gold/80">
                  {step.subtitle}
                </p>

                <p className="leading-relaxed text-primary-foreground/60">
                  {step.description}
                </p>

                {/* Gold accent line */}
                <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gold transition-all duration-500 group-hover:w-1/2" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

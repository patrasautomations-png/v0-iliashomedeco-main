'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { COLLECTIONS } from '@/lib/constants'

export function Collections() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="collections"
      ref={ref}
      className="bg-offwhite py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-gold">
            Our Collections
          </p>
          <h2 className="font-serif text-3xl font-bold text-charcoal md:text-5xl">
            <span className="text-balance">Curated for Mediterranean Living</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {COLLECTIONS.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative cursor-pointer overflow-hidden rounded-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-charcoal/30 transition-all duration-500 group-hover:bg-charcoal/60" />

                {/* Gold glow on hover */}
                <div className="absolute inset-0 opacity-0 shadow-[inset_0_0_40px_rgba(184,134,11,0.2)] transition-opacity duration-500 group-hover:opacity-100" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <h3 className="mb-2 font-serif text-2xl font-bold text-primary-foreground md:text-3xl">
                    {collection.title}
                  </h3>

                  <p className="mb-4 max-w-sm text-sm leading-relaxed text-primary-foreground/0 transition-all duration-500 group-hover:text-primary-foreground/80">
                    {collection.description}
                  </p>

                  <div className="flex items-center gap-2 text-gold">
                    <span className="text-sm font-medium uppercase tracking-widest opacity-0 transition-all duration-500 group-hover:opacity-100">
                      Explore
                    </span>
                    <ArrowRight className="size-4 -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                </div>
              </div>

              {/* Gold bottom border on hover */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gold transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

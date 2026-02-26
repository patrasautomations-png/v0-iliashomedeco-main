'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin, X } from 'lucide-react'
import Image from 'next/image'
import { PORTFOLIO_PROJECTS, type Hotspot } from '@/lib/constants'

function HotspotDot({
  hotspot,
  isActive,
  onClick,
}: {
  hotspot: Hotspot
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
      aria-label={`View details for ${hotspot.productName}`}
    >
      <span className="relative flex size-5">
        <span className="absolute inline-flex size-full animate-pulse-gold rounded-full bg-gold/40" />
        <span className="relative inline-flex size-5 items-center justify-center rounded-full border-2 border-gold bg-charcoal">
          <span className="size-1.5 rounded-full bg-gold" />
        </span>
      </span>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 top-full mt-2 w-52 -translate-x-1/2 rounded-lg border border-gold/20 bg-charcoal/95 p-4 shadow-xl backdrop-blur-md"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-gold/60">
              {hotspot.category}
            </p>
            <p className="mt-1 font-serif text-sm font-semibold text-primary-foreground">
              {hotspot.productName}
            </p>
            <a
              href="#contact"
              className="mt-3 inline-flex w-full items-center justify-center rounded-sm border border-gold/40 px-3 py-1.5 text-xs font-medium text-gold transition-all hover:bg-gold hover:text-charcoal"
            >
              Request Details
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

export function Portfolio() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeProject, setActiveProject] = useState(0)
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null)

  const nextProject = useCallback(() => {
    setActiveProject((prev) =>
      prev === PORTFOLIO_PROJECTS.length - 1 ? 0 : prev + 1
    )
    setActiveHotspot(null)
  }, [])

  const prevProject = useCallback(() => {
    setActiveProject((prev) =>
      prev === 0 ? PORTFOLIO_PROJECTS.length - 1 : prev - 1
    )
    setActiveHotspot(null)
  }, [])

  const currentProject = PORTFOLIO_PROJECTS[activeProject]

  return (
    <section
      id="portfolio"
      ref={ref}
      className="bg-charcoal py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-gold">
            Our Work
          </p>
          <h2 className="font-serif text-3xl font-bold text-primary-foreground md:text-5xl">
            <span className="text-balance">Projects in Kefalonia</span>
          </h2>
        </motion.div>

        {/* Desktop Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:block"
        >
          <div className="relative">
            {/* Main Image */}
            <div
              className="group relative aspect-[16/9] overflow-hidden rounded-lg"
              onClick={() => setActiveHotspot(null)}
              role="presentation"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentProject.image}
                    alt={currentProject.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                  />
                  <div className="absolute inset-0 bg-charcoal/20" />

                  {/* Hotspots */}
                  {currentProject.hotspots.map((hotspot, i) => (
                    <HotspotDot
                      key={`${currentProject.id}-${i}`}
                      hotspot={hotspot}
                      isActive={activeHotspot === i}
                      onClick={() =>
                        setActiveHotspot(activeHotspot === i ? null : i)
                      }
                    />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Project Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-8">
                <h3 className="font-serif text-2xl font-bold text-primary-foreground">
                  {currentProject.title}
                </h3>
                <div className="mt-1 flex items-center gap-1.5 text-gold/80">
                  <MapPin className="size-3.5" />
                  <span className="text-sm">{currentProject.location}</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {PORTFOLIO_PROJECTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveProject(i)
                      setActiveHotspot(null)
                    }}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === activeProject
                        ? 'w-8 bg-gold'
                        : 'w-4 bg-primary-foreground/20 hover:bg-primary-foreground/40'
                    }`}
                    aria-label={`Go to project ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={prevProject}
                  className="flex size-10 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/60 transition-all hover:border-gold hover:text-gold"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  onClick={nextProject}
                  className="flex size-10 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/60 transition-all hover:border-gold hover:text-gold"
                  aria-label="Next project"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Stack */}
        <div className="flex flex-col gap-6 md:hidden">
          {PORTFOLIO_PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-[4/3] overflow-hidden rounded-lg"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-charcoal/30" />

              {/* Hotspots */}
              {project.hotspots.map((hotspot, i) => (
                <HotspotDot
                  key={`mobile-${project.id}-${i}`}
                  hotspot={hotspot}
                  isActive={false}
                  onClick={() => {}}
                />
              ))}

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-5">
                <h3 className="font-serif text-xl font-bold text-primary-foreground">
                  {project.title}
                </h3>
                <div className="mt-1 flex items-center gap-1.5 text-gold/80">
                  <MapPin className="size-3" />
                  <span className="text-xs">{project.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

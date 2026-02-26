'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, SITE_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-charcoal/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a
            href="#home"
            className="flex items-center gap-2"
            aria-label="Go to home"
          >
            <Image
              src="/images/logo.png"
              alt={SITE_NAME}
              width={120}
              height={48}
              className="h-10 w-auto lg:h-12"
              priority
            />
          </a>

          <ul className="hidden items-center gap-8 md:flex" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium tracking-wide text-primary-foreground/80 transition-colors duration-200 hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden rounded-sm border border-gold px-5 py-2 text-sm font-medium text-gold transition-all duration-300 hover:bg-gold hover:text-charcoal hover:shadow-[0_0_20px_rgba(184,134,11,0.3)] md:inline-flex"
          >
            Book Consultation
          </a>

          <button
            onClick={() => setMobileOpen(true)}
            className="text-primary-foreground md:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-6" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-charcoal/98 backdrop-blur-md md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <Image
                src="/images/logo.png"
                alt={SITE_NAME}
                width={100}
                height={40}
                className="h-9 w-auto"
              />
              <button
                onClick={() => setMobileOpen(false)}
                className="text-primary-foreground"
                aria-label="Close menu"
              >
                <X className="size-6" />
              </button>
            </div>

            <nav className="flex flex-col items-center justify-center gap-8 pt-20">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="font-serif text-3xl text-primary-foreground/80 transition-colors hover:text-gold"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.1 }}
                className="mt-4 rounded-sm border border-gold px-8 py-3 text-gold transition-all hover:bg-gold hover:text-charcoal"
              >
                Book Consultation
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

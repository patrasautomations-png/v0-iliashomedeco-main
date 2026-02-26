'use client'

import { NAV_LINKS, SITE_NAME } from '@/lib/constants'
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react'

const SOCIAL_LINKS = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Mail, href: 'mailto:info@iliashomedeco.gr', label: 'Email' },
]

export function Footer() {
  return (
    <footer className="bg-charcoal">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        {/* Top section */}
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <div className="text-center">
            <span className="font-serif text-3xl font-bold tracking-wider text-primary-foreground">
              IHD
            </span>
            <p className="mt-2 text-sm tracking-widest text-primary-foreground/40">
              {SITE_NAME}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-primary-foreground/50 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact Details */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/40">
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5 text-gold/60" />
              <span>Kefalonia, Greece</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="size-3.5 text-gold/60" />
              <span>+30 26710 00000</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="size-3.5 text-gold/60" />
              <span>info@iliashomedeco.gr</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="flex size-10 items-center justify-center rounded-full border border-primary-foreground/10 text-primary-foreground/40 transition-all duration-300 hover:border-gold hover:text-gold hover:shadow-[0_0_15px_rgba(184,134,11,0.2)]"
                aria-label={social.label}
              >
                <social.icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-primary-foreground/10" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-primary-foreground/30">
            {`\u00A9 ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.`}
          </p>
          <p className="text-xs text-primary-foreground/30">
            Luxury Furniture & Interior Design in Kefalonia
          </p>
        </div>
      </div>
    </footer>
  )
}

'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Palette, Layers, Ruler, Check, ZoomIn, ZoomOut, ChevronRight } from 'lucide-react'
import Image from 'next/image'

// ─── Data ────────────────────────────────────────────────────────────────────

interface ColorOption {
  id: string
  label: string
  hex: string
}

interface DesignOption {
  id: string
  label: string
  subtitle: string
  /** repeating CSS background for the fabric texture overlay */
  cssPattern: string | null
}

interface SizeOption {
  id: string
  label: string
  desc: string
  /** width % of container */
  widthPct: number
  /** height % of container */
  heightPct: number
}

const COLORS: ColorOption[] = [
  { id: 'white',      label: 'Pure White',    hex: '#FFFFFF' },
  { id: 'ivory',      label: 'Ivory',         hex: '#F5F0E8' },
  { id: 'cream',      label: 'Warm Cream',    hex: '#EAE0CC' },
  { id: 'greige',     label: 'Greige',        hex: '#C8BFB0' },
  { id: 'stone',      label: 'Stone',         hex: '#9E8F7E' },
  { id: 'dusty-rose', label: 'Dusty Rose',    hex: '#D4A5A5' },
  { id: 'blush',      label: 'Blush',         hex: '#E8CFD0' },
  { id: 'sage',       label: 'Sage Green',    hex: '#8FAA8B' },
  { id: 'slate',      label: 'Slate Blue',    hex: '#7A9BB5' },
  { id: 'navy',       label: 'Navy',          hex: '#2C3E6B' },
  { id: 'charcoal',   label: 'Charcoal',      hex: '#3D3D3D' },
  { id: 'terracotta', label: 'Terracotta',    hex: '#C47A5A' },
]

const DESIGNS: DesignOption[] = [
  {
    id: 'plain',
    label: 'Plain',
    subtitle: 'Clean, smooth finish',
    cssPattern: null,
  },
  {
    id: 'linen',
    label: 'Natural Linen',
    subtitle: 'Organic woven texture',
    cssPattern: `repeating-linear-gradient(
      0deg,
      rgba(255,255,255,0.06) 0px,
      rgba(255,255,255,0.06) 1px,
      transparent 1px,
      transparent 4px
    ), repeating-linear-gradient(
      90deg,
      rgba(255,255,255,0.06) 0px,
      rgba(255,255,255,0.06) 1px,
      transparent 1px,
      transparent 4px
    )`,
  },
  {
    id: 'sheer',
    label: 'Sheer Voile',
    subtitle: 'Light-filtering elegance',
    cssPattern: `repeating-linear-gradient(
      45deg,
      rgba(255,255,255,0.08) 0px,
      rgba(255,255,255,0.08) 1px,
      transparent 1px,
      transparent 8px
    )`,
  },
  {
    id: 'velvet',
    label: 'Velvet',
    subtitle: 'Luxurious deep pile',
    cssPattern: `radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.12) 0%, transparent 60%), 
      radial-gradient(ellipse at 70% 70%, rgba(0,0,0,0.08) 0%, transparent 60%)`,
  },
  {
    id: 'stripe',
    label: 'Classic Stripe',
    subtitle: 'Timeless linear pattern',
    cssPattern: `repeating-linear-gradient(
      90deg,
      rgba(255,255,255,0.10) 0px,
      rgba(255,255,255,0.10) 12px,
      rgba(0,0,0,0.04) 12px,
      rgba(0,0,0,0.04) 24px
    )`,
  },
]

const SIZES: SizeOption[] = [
  { id: 's',  label: '140 × 220 cm', desc: 'Small windows',    widthPct: 44, heightPct: 72 },
  { id: 'm',  label: '160 × 240 cm', desc: 'Standard windows', widthPct: 52, heightPct: 82 },
  { id: 'l',  label: '200 × 270 cm', desc: 'Floor to ceiling', widthPct: 62, heightPct: 93 },
  { id: 'xl', label: '240 × 300 cm', desc: 'Extra-long drop',  widthPct: 68, heightPct: 100 },
]

// ─── Tab pill ────────────────────────────────────────────────────────────────

function TabBtn({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
        active ? 'text-charcoal' : 'text-primary-foreground/50 hover:text-primary-foreground/80'
      }`}
    >
      {active && (
        <motion.div
          layoutId="tab-bg"
          className="absolute inset-0 rounded-sm bg-gold"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
        />
      )}
      <span className="relative z-10">{icon}</span>
      <span className="relative z-10">{label}</span>
    </button>
  )
}

// ─── Main ────────────────────────────────────────────────────────────────────

export function CurtainVisualizer() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const [color, setColor] = useState<ColorOption>(COLORS[0])
  const [design, setDesign] = useState<DesignOption>(DESIGNS[0])
  const [size, setSize] = useState<SizeOption>(SIZES[2])
  const [tab, setTab] = useState<'color' | 'design' | 'size'>('color')
  const [zoomed, setZoomed] = useState(false)

  // Is the color light enough that folds won't show? Lighten blend opacity for dark colours.
  const isDark = ['navy', 'charcoal'].includes(color.id)
  const tintOpacity = color.id === 'white' ? 0 : isDark ? 0.82 : 0.65

  return (
    <section
      id="visualizer"
      ref={ref}
      className="relative overflow-hidden bg-charcoal py-24 lg:py-32"
    >
      {/* Subtle BG watermark */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015] flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="size-[700px]" fill="currentColor">
          <path d="M100 20L20 90V180H75V130H125V180H180V90L100 20Z" className="text-primary-foreground" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-gold">
            Interactive Experience
          </p>
          <h2 className="font-serif text-3xl font-bold text-primary-foreground md:text-5xl">
            <span className="text-balance">Visualise Your Curtains</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/50 text-base leading-relaxed">
            Choose your colour, fabric and size — see it live in a real room before you buy.
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-1 gap-0 overflow-hidden rounded-lg border border-primary-foreground/10 lg:grid-cols-[1fr_360px]"
        >

          {/* ── LEFT: Visualizer canvas ── */}
          <div className="relative flex items-center justify-center bg-[#111111] min-h-[420px] lg:min-h-[560px] overflow-hidden">

            {/* Zoom toggle */}
            <button
              onClick={() => setZoomed(z => !z)}
              className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-sm border border-primary-foreground/20 bg-charcoal/80 px-3 py-1.5 text-xs text-primary-foreground/60 backdrop-blur-sm hover:border-gold/50 hover:text-gold transition-all duration-200"
            >
              {zoomed ? <ZoomOut size={12} /> : <ZoomIn size={12} />}
              {zoomed ? 'Zoom Out' : 'Zoom In'}
            </button>

            <motion.div
              animate={{ scale: zoomed ? 1.5 : 1 }}
              transition={{ duration: 0.5, ease: [0.32, 0, 0.18, 1] }}
              className="relative w-full h-full"
              style={{ minHeight: 'inherit' }}
            >
              {/*
               * ASSET GUIDE:
               *
               * 📁 /public/curtain-assets/base_room.jpg
               *    → Image 2 you provided: empty room with window, curtain rod, wood floor.
               *    → Save as-is. This is the scene background.
               *
               * 📁 /public/curtain-assets/curtain_mask.png
               *    → Image 1 you provided: the close-up white curtain fabric.
               *    → Remove the background in Photoshop / remove.bg so only the
               *      fabric + shadow folds remain on a TRANSPARENT PNG.
               *    → The preserved grey shadows are what makes colour-tinting look real.
               */}

              {/* Layer 1 — Room */}
              <Image
                src="/curtain-assets/base_room.jpg"
                alt="Room with window"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />

              {/* Layer 2 — Curtain fabric PNG, right-aligned to hang from the rod */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={size.id}
                  initial={{ opacity: 0, scaleY: 0.95 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute right-0 top-0 overflow-hidden"
                  style={{
                    width: `${size.widthPct}%`,
                    height: `${size.heightPct}%`,
                    transformOrigin: 'top center',
                  }}
                >
                  {/* Fabric image */}
                  <img
                    src="/curtain-assets/curtain_mask.png"
                    alt="Curtain overlay"
                    className="absolute inset-0 w-full h-full object-cover select-none"
                    draggable={false}
                  />

                  {/* Colour tint — mix-blend-mode:multiply preserves the fabric shadows */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={color.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: tintOpacity }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundColor: color.hex,
                        mixBlendMode: 'multiply',
                      }}
                    />
                  </AnimatePresence>

                  {/* Texture / design overlay */}
                  <AnimatePresence mode="wait">
                    {design.cssPattern && (
                      <motion.div
                        key={design.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: design.cssPattern,
                          mixBlendMode: 'overlay',
                        }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Live selection badge */}
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-sm border border-primary-foreground/10 bg-charcoal/85 px-3 py-2 text-xs text-primary-foreground/70 backdrop-blur-sm">
              <span
                className="size-3 rounded-full border border-white/20 flex-shrink-0"
                style={{ backgroundColor: color.hex }}
              />
              <span className="font-medium text-primary-foreground/90">{color.label}</span>
              <span className="text-primary-foreground/30">·</span>
              <span>{design.label}</span>
              <span className="text-primary-foreground/30">·</span>
              <span>{size.label}</span>
            </div>
          </div>

          {/* ── RIGHT: Controls panel ── */}
          <div className="flex flex-col bg-charcoal-light/80 border-l border-primary-foreground/10">

            {/* Tabs */}
            <div className="flex gap-1 border-b border-primary-foreground/10 p-3">
              <TabBtn
                active={tab === 'color'}
                onClick={() => setTab('color')}
                icon={<Palette size={13} />}
                label="Colour"
              />
              <TabBtn
                active={tab === 'design'}
                onClick={() => setTab('design')}
                icon={<Layers size={13} />}
                label="Fabric"
              />
              <TabBtn
                active={tab === 'size'}
                onClick={() => setTab('size')}
                icon={<Ruler size={13} />}
                label="Size"
              />
            </div>

            {/* Panel body */}
            <div className="flex-1 overflow-y-auto p-5">
              <AnimatePresence mode="wait">

                {/* COLOUR TAB */}
                {tab === 'color' && (
                  <motion.div
                    key="color"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold/60">
                      Select Colour
                    </p>
                    <div className="grid grid-cols-4 gap-2.5">
                      {COLORS.map(c => (
                        <button
                          key={c.id}
                          onClick={() => setColor(c)}
                          title={c.label}
                          className="group flex flex-col items-center gap-1.5"
                        >
                          <span
                            className={`relative flex size-12 items-center justify-center rounded-sm transition-all duration-200 border ${
                              color.id === c.id
                                ? 'border-gold scale-110 shadow-[0_0_12px_rgba(184,134,11,0.5)]'
                                : 'border-primary-foreground/10 hover:border-primary-foreground/40 hover:scale-105'
                            }`}
                            style={{ backgroundColor: c.hex }}
                          >
                            {color.id === c.id && (
                              <Check
                                size={13}
                                className={['white', 'ivory', 'cream', 'blush', 'greige'].includes(c.id)
                                  ? 'text-charcoal'
                                  : 'text-white'}
                              />
                            )}
                          </span>
                          <span className="text-[10px] text-center leading-tight text-primary-foreground/40">
                            {c.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* DESIGN TAB */}
                {tab === 'design' && (
                  <motion.div
                    key="design"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold/60">
                      Select Fabric
                    </p>
                    <div className="flex flex-col gap-2">
                      {DESIGNS.map(d => (
                        <button
                          key={d.id}
                          onClick={() => setDesign(d)}
                          className={`group flex items-center gap-3 rounded-sm border p-3 text-left transition-all duration-200 ${
                            design.id === d.id
                              ? 'border-gold bg-gold/10 shadow-[0_0_15px_rgba(184,134,11,0.15)]'
                              : 'border-primary-foreground/10 hover:border-primary-foreground/30 hover:bg-primary-foreground/5'
                          }`}
                        >
                          {/* Swatch preview */}
                          <span
                            className="size-10 rounded-sm flex-shrink-0 border border-primary-foreground/10"
                            style={{
                              backgroundColor: color.hex,
                              backgroundImage: d.cssPattern ?? undefined,
                              mixBlendMode: 'normal',
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-semibold ${design.id === d.id ? 'text-gold' : 'text-primary-foreground/80'}`}>
                              {d.label}
                            </p>
                            <p className="text-xs text-primary-foreground/40 mt-0.5">{d.subtitle}</p>
                          </div>
                          {design.id === d.id && <Check size={13} className="text-gold flex-shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* SIZE TAB */}
                {tab === 'size' && (
                  <motion.div
                    key="size"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold/60">
                      Select Size
                    </p>
                    <div className="flex flex-col gap-2">
                      {SIZES.map(s => (
                        <button
                          key={s.id}
                          onClick={() => setSize(s)}
                          className={`group flex items-center gap-4 rounded-sm border p-4 text-left transition-all duration-200 ${
                            size.id === s.id
                              ? 'border-gold bg-gold/10 shadow-[0_0_15px_rgba(184,134,11,0.15)]'
                              : 'border-primary-foreground/10 hover:border-primary-foreground/30 hover:bg-primary-foreground/5'
                          }`}
                        >
                          {/* Height visualiser bars */}
                          <span className="flex items-end gap-[3px] flex-shrink-0">
                            {SIZES.map(bar => {
                              const active = SIZES.findIndex(x => x.id === s.id) >= SIZES.findIndex(x => x.id === bar.id)
                              return (
                                <span
                                  key={bar.id}
                                  className={`w-1.5 rounded-sm transition-all duration-200 ${
                                    active
                                      ? size.id === s.id ? 'bg-gold' : 'bg-primary-foreground/40'
                                      : 'bg-primary-foreground/10'
                                  }`}
                                  style={{ height: bar.id === 's' ? 10 : bar.id === 'm' ? 16 : bar.id === 'l' ? 22 : 28 }}
                                />
                              )
                            })}
                          </span>
                          <div className="flex-1">
                            <p className={`text-sm font-semibold ${size.id === s.id ? 'text-gold' : 'text-primary-foreground/80'}`}>
                              {s.label}
                            </p>
                            <p className="text-xs text-primary-foreground/40 mt-0.5">{s.desc}</p>
                          </div>
                          {size.id === s.id && <Check size={13} className="text-gold flex-shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Summary + CTA */}
            <div className="border-t border-primary-foreground/10 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs text-primary-foreground/40">
                <span
                  className="size-3 rounded-full flex-shrink-0 border border-white/10"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-primary-foreground/70 font-medium">{color.label}</span>
                <span>·</span>
                <span>{design.label}</span>
                <span>·</span>
                <span>{size.label}</span>
              </div>

              <a
                href="#contact"
                className="group flex w-full items-center justify-center gap-2 rounded-sm border-2 border-gold bg-transparent px-6 py-3.5 text-sm font-semibold uppercase tracking-widest text-gold transition-all duration-300 hover:bg-gold hover:text-charcoal hover:shadow-[0_0_30px_rgba(184,134,11,0.4)]"
              >
                Order This Configuration
                <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>

              <a
                href="#contact"
                className="flex w-full items-center justify-center gap-2 rounded-sm border border-primary-foreground/20 px-6 py-3 text-sm font-medium text-primary-foreground/50 transition-all duration-200 hover:border-primary-foreground/40 hover:text-primary-foreground/80"
              >
                Request a Fabric Sample
              </a>
            </div>
          </div>

        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-5 text-center text-xs text-primary-foreground/25"
        >
          Colours may vary slightly on screen. Request a physical sample for exact colour matching.
        </motion.p>

      </div>
    </section>
  )
}

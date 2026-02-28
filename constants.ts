export const SITE_NAME = 'ILIAS HOME DECO'
export const SITE_TAGLINE = 'Luxury Furniture & Interior Design'
export const SITE_LOCATION = 'Kefalonia, Greece'

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Collections', href: '#collections' },
  { label: 'Visualizer', href: '#visualizer' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
] as const

export const COLLECTIONS = [
  {
    id: 'furniture',
    title: 'Furniture',
    description:
      'Handcrafted pieces designed for Mediterranean living. Sofas, tables, and accent chairs that define luxury.',
    image: '/images/collection-furniture.jpg',
  },
  {
    id: 'curtains',
    title: 'Curtains & Fabrics',
    description:
      'Premium textiles and bespoke curtain solutions. From sheer elegance to dramatic drapes.',
    image: '/images/collection-curtains.jpg',
  },
  {
    id: 'hanging',
    title: 'Hanging Systems',
    description:
      'Precision-engineered brass and chrome rail systems. Silent operation, timeless design.',
    image: '/images/collection-hanging.jpg',
  },
  {
    id: 'mattresses',
    title: 'Mattresses & Sleep',
    description:
      'Premium sleep solutions for complete comfort. Orthopaedic and luxury mattresses.',
    image: '/images/collection-mattresses.jpg',
  },
] as const

export const PHILOSOPHY_STEPS = [
  {
    id: 'precision',
    title: 'Precision',
    subtitle: 'On-site Measurement',
    description:
      'Our team visits your space to capture every dimension. Exact measurements ensure a flawless fit for every element of your design.',
    icon: 'Ruler' as const,
  },
  {
    id: 'personalization',
    title: 'Personalization',
    subtitle: 'Custom Design Selection',
    description:
      'Choose from our curated collections and premium materials. Every fabric, finish, and form is tailored to your vision.',
    icon: 'Palette' as const,
  },
  {
    id: 'perfection',
    title: 'Perfection',
    subtitle: 'Professional Installation',
    description:
      'Expert craftsmen bring your design to life with meticulous installation. Every detail placed with care and precision.',
    icon: 'Award' as const,
  },
] as const

export interface Hotspot {
  x: number
  y: number
  productName: string
  category: string
}

export interface PortfolioProject {
  id: string
  title: string
  location: string
  image: string
  hotspots: Hotspot[]
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'villa-antisamos',
    title: 'Villa Antisamos',
    location: 'Sami, Kefalonia',
    image: '/images/portfolio-1.jpg',
    hotspots: [
      { x: 30, y: 45, productName: 'Lena Sectional Sofa', category: 'Furniture' },
      { x: 65, y: 35, productName: 'Ionian Sheer Curtains', category: 'Curtains' },
      { x: 50, y: 70, productName: 'Marble Coffee Table', category: 'Furniture' },
    ],
  },
  {
    id: 'suite-argostoli',
    title: 'Boutique Suite',
    location: 'Argostoli, Kefalonia',
    image: '/images/portfolio-2.jpg',
    hotspots: [
      { x: 40, y: 50, productName: 'Cloud Nine Mattress', category: 'Mattresses' },
      { x: 70, y: 30, productName: 'Brass Rail System', category: 'Hanging Systems' },
    ],
  },
  {
    id: 'hotel-fiskardo',
    title: 'Hotel Aeolus',
    location: 'Fiskardo, Kefalonia',
    image: '/images/portfolio-3.jpg',
    hotspots: [
      { x: 25, y: 40, productName: 'Velvet Armchair Duo', category: 'Furniture' },
      { x: 55, y: 55, productName: 'Silk Drape Collection', category: 'Curtains' },
      { x: 80, y: 35, productName: 'Pendant Light Trio', category: 'Furniture' },
    ],
  },
  {
    id: 'villa-lixouri',
    title: 'Villa Cephalonia',
    location: 'Lixouri, Kefalonia',
    image: '/images/portfolio-4.jpg',
    hotspots: [
      { x: 45, y: 40, productName: 'Olive Wood Dining Table', category: 'Furniture' },
      { x: 20, y: 60, productName: 'Linen Roman Shades', category: 'Curtains' },
    ],
  },
  {
    id: 'terrace-skala',
    title: 'Seaside Terrace',
    location: 'Skala, Kefalonia',
    image: '/images/portfolio-5.jpg',
    hotspots: [
      { x: 35, y: 50, productName: 'Teak Lounge Set', category: 'Furniture' },
      { x: 60, y: 40, productName: 'Outdoor Canvas Drapes', category: 'Curtains' },
      { x: 75, y: 65, productName: 'Stone Side Table', category: 'Furniture' },
    ],
  },
]

export const SPACE_TYPES = [
  { id: 'villa', label: 'Villa', icon: 'Home' as const },
  { id: 'apartment', label: 'Apartment', icon: 'Building' as const },
  { id: 'hotel', label: 'Hotel', icon: 'Hotel' as const },
] as const

export const NEEDS_OPTIONS = [
  { id: 'furniture', label: 'Furniture' },
  { id: 'curtains', label: 'Curtains & Fabrics' },
  { id: 'full-deco', label: 'Full Decoration' },
  { id: 'hanging', label: 'Hanging Systems' },
  { id: 'mattresses', label: 'Mattresses & Sleep' },
] as const

export const KEFALONIA_DISTRICTS = [
  'Argostoli',
  'Lixouri',
  'Sami',
  'Fiskardo',
  'Skala',
  'Poros',
  'Agia Efimia',
  'Lassi',
] as const

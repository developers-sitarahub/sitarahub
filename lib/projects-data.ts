export interface Project {
  number: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  tags: string[];
  url: string;
  color: string;
  year: string;
  stat: string;
  statLabel: string;
  embedBlocked?: boolean;
  previewImage?: string;
  
  // Detailed case study fields
  challenge: string;
  solution: string;
  impact: string[];
  tech: string[];
  visualizer: 'network' | 'wave' | 'globe' | 'grid' | 'ribbon' | 'wireframe';
}

export const projects: Project[] = [
  {
    number: '01',
    name: 'GPSERP',
    slug: 'gpserp',
    category: 'WhatsApp Automation & ERP',
    description:
      'Enterprise WhatsApp automation platform with native flows, dual workflow engines, interactive catalogs, AI chatbots, and a unified team inbox — built on the Meta Business API.',
    tags: ['WhatsApp API', 'ERP', 'AI Automation', 'CRM'],
    url: 'https://gpserp.com',
    color: '#a855f7',
    year: '2025',
    stat: '10x',
    statLabel: 'Message Throughput',
    visualizer: 'network',
    challenge:
      'Enterprise sales teams and customer support desks frequently struggle with slow message response times and disjointed communication channels. The challenge was to build an enterprise-grade customer relationship manager directly integrated with Meta’s Business Cloud API, supporting high concurrency, real-time sync, and complex automated workflow logic.',
    solution:
      'We designed GPSERP with a robust node-based workflow editor, double-engine queue processors using Redis, and a custom multi-agent team inbox using WebSockets for instantaneous messaging. AI-driven chatbots powered by OpenAI models were integrated to handle common queries, while custom WhatsApp Interactive Templates (buttons, list lists, native flows) were supported out-of-the-box.',
    impact: [
      'Facilitated over 10x message throughput improvement during peak workloads.',
      'Achieved a 99.9% message delivery SLA with automatic retry logic.',
      'Reduced average customer response times by 78% using automated flow routing.'
    ],
    tech: ['Next.js', 'Node.js', 'Meta Cloud API', 'Redis', 'WebSockets', 'PostgreSQL', 'OpenAI API']
  },
  {
    number: '02',
    name: 'Mail by GPSERP',
    slug: 'mail-by-gpserp',
    category: 'AI Email Outreach Platform',
    description:
      'AI-powered cold email outreach platform with intelligent personalization, campaign scaling, and high deliverability. Generates hyper-personalized emails at scale.',
    tags: ['AI', 'Email Marketing', 'Cold Outreach', 'Automation'],
    url: 'https://mail.gpserp.com',
    color: '#3b82f6',
    year: '2025',
    stat: '3x',
    statLabel: 'Reply Rate',
    visualizer: 'wave',
    challenge:
      'Cold email outreach campaigns often suffer from low engagement due to generic messaging and poor domain reputation setups. The client needed a platform capable of scaling to thousands of personalized emails a day while avoiding spam filters and ensuring high inbox placement.',
    solution:
      'Sitarahub engineered an intelligent mail routing pipeline. The system distributes campaigns across dozens of dynamic sender domains with automatic warm-ups and rotational delivery. It uses LLMs to scan prospect company websites and generate hyper-personalized intro lines, scheduling emails with randomized delays that replicate human sender behavior.',
    impact: [
      'Boosted cold email reply rates by 3x on average for B2B users.',
      'Maintained a deliverability score of 98.4% across sender domain networks.',
      'Auto-generated over 100,000 highly personalized emails with zero template feel.'
    ],
    tech: ['Next.js', 'Express.js', 'OpenAI API', 'BullMQ', 'SMTP Pool', 'Tailwind CSS', 'MongoDB']
  },
  {
    number: '03',
    name: 'National Franchise Investment Summit',
    slug: 'national-franchise-investment-summit',
    category: 'Franchise Ecosystem Platform',
    description:
      "India's premier franchise exhibition platform — 500+ brands, investor discovery, exhibition management, and deal facilitation across 12 industry verticals.",
    tags: ['Franchise', 'Events', 'Marketplace', 'B2B'],
    url: 'https://nationalfranchiseinvestmentsummit.com',
    color: '#ef4444',
    year: '2025',
    stat: '500+',
    statLabel: 'Brands Onboarded',
    visualizer: 'globe',
    challenge:
      "To connect India's top franchise brands with prospective regional and master franchise partners, a massive digital hub was needed. The portal required catalog navigation across 12 industries, exhibitor booths management, lead generation tools, and live deal coordination for a large physical/digital hybrid summit.",
    solution:
      'We built a custom multi-tenant portal that showcases franchise brands with extensive profile dashboards, financial tiers, and marketing materials. It features a matchmaking directory for buyers and franchise consultants, an interactive virtual floor layout representing physical exhibition stalls, and automated lead capture tools.',
    impact: [
      'Onboarded 500+ franchise brands and over 25,000 interested investors.',
      'Facilitated seamless lead distribution to exhibitors in real time during the summit.',
      'Generated over 15,000 verified investment match requests within the first 30 days.'
    ],
    tech: ['Next.js', 'Prisma ORM', 'PostgreSQL', 'Tailwind CSS', 'SendGrid', 'Vercel CDN']
  },
  {
    number: '04',
    name: 'Indo Global Trade Fair',
    slug: 'indo-global-trade-fair',
    category: 'B2B International Trade Platform',
    description:
      "Premier B2B trade platform connecting India's MSMEs with global markets — 16 sectors, 400+ exhibitors, 6000+ trade buyers from 40+ countries.",
    tags: ['B2B', 'Trade', 'MSME', 'International'],
    url: 'https://www.indoglobaltradefair.com',
    color: '#f59e0b',
    year: '2025',
    stat: '50K+',
    statLabel: 'Concurrent Users',
    visualizer: 'grid',
    challenge:
      "The Indo Global Trade Fair connects micro, small, and medium businesses (MSMEs) with foreign trade delegates. The portal required a highly optimized directory and live buyer-seller negotiation channels that could sustain huge traffic spikes during global trading hours.",
    solution:
      'Our team designed a static-first Next.js portal utilizing Incremental Static Regeneration (ISR) to handle heavy listing traffic with near-zero load times. We integrated real-time video/chat meetings directly into the portal using socket servers, along with translation modules to support delegates from 40+ countries.',
    impact: [
      'Supported 50,000+ concurrent users with sub-second page loads.',
      'Hosted over 400+ international exhibitors across 16 primary industrial sectors.',
      'Enabled the secure setup of over 8,000 buyer-seller meetings.'
    ],
    tech: ['Next.js', 'Socket.io', 'Node.js', 'Redis Cache', 'MongoDB', 'AWS EC2', 'Tailwind CSS']
  },
  {
    number: '05',
    name: 'Raffu',
    slug: 'raffu',
    category: 'Clothing Alterations Marketplace',
    description:
      'On-demand booking platform for clothing alterations and invisible mending — customers book fixed-price fittings with vetted local tailoring studios, from everyday hems to lehengas and sherwanis.',
    tags: ['Marketplace', 'Booking', 'Two-Sided Platform', 'Fashion'],
    url: 'https://raffu.com',
    color: '#14b8a6',
    year: '2026',
    stat: '24h',
    statLabel: 'Express Turnaround',
    visualizer: 'ribbon',
    challenge:
      'Getting clothes altered usually means hunting for a reliable tailor, haggling over price, and chasing updates by phone. Raffu set out to turn that into a trusted, bookable service — which meant building two products at once: a simple booking experience for customers and a portal for independent tailoring studios to receive, manage, and fulfil those orders.',
    solution:
      'We built a Next.js booking flow where customers pick a garment category, choose the work needed, upload up to four reference photos, and book instantly or schedule for later. Orders are routed by postcode to the nearest certified partner studio, and each booking issues a QR fitting pass for check-in at the studio. A separate partner studio portal handles incoming jobs, while live order tracking keeps customers updated through 24h express and 48h atelier turnarounds.',
    impact: [
      'Replaced phone-and-walk-in tailoring with fixed upfront pricing and instant online booking.',
      'Launched a two-sided marketplace: a customer booking app plus a dedicated partner studio portal.',
      'Covers six garment categories, including specialist ethnic and occasion wear, backed by a free re-fit guarantee.'
    ],
    tech: ['Next.js', 'React', 'Vercel','QR Fitting Passes', 'Postcode-Based Routing']
  }
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((p) => p.slug === slug);
};

export const getNextProject = (currentSlug: string): Project => {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  const nextIndex = (currentIndex + 1) % projects.length;
  return projects[nextIndex];
};

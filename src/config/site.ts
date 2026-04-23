export const siteConfig = {
  name: 'Kristian Azzet',
  url: 'https://kristianazzet.com',
  description: 'DJ Kristian Azzet — house, melodic techno, deep. Book for your event.',

  /**
   * Main nav — only routes with dedicated pages.
   */
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Shows', href: '/shows' },
    { label: 'Music', href: '/music' },
    { label: 'Contact', href: '/contact' },
  ] as { label: string; href: string }[],

  /** Tour locations fallback (rolling locations marquee) */
  tourLocations: [
    { country: 'Denmark', cities: ['Copenhagen', 'Aarhus', 'Aalborg', 'Odense'] },
    { country: 'Sweden', cities: ['Stockholm', 'Gothenburg'] },
    { country: 'Norway', cities: ['Oslo', 'Bergen'] },
    { country: 'Germany', cities: ['Berlin', 'Hamburg'] },
    { country: 'Netherlands', cities: ['Amsterdam'] },
    { country: 'Spain', cities: ['Barcelona', 'Ibiza'] },
  ] as { country: string; cities: string[] }[],

  /**
   * Uncharted Culture — ekstern partner (management, artister, kommende artikler).
   * Bruges i footer-kortet.
   */
  unchartedCulture: {
    url: 'https://unchartedculture.com',
    title: 'Uncharted Culture',
    eyebrow: 'Music management & culture',
    description:
      'Artist management and career strategy, with a spotlight on upcoming acts — plus editorial features and articles in the pipeline.',
    highlights: ['Bookings & strategy', 'Emerging artists', 'Articles & stories'],
  },

  // Booking info
  booking: {
    agent: 'Theis Sølberg',
    company: 'Uncharted Culture',
    email: 'theis@unchartedculture.com',
    phone: '+45 55 13 79 66',
  },

  // Press kit link
  pressKitUrl: 'https://www.dropbox.com/scl/fo/4tzfqe8etcnen49830n1y/AJuWsyZVHaH23t33QqORvXo?rlkey=ds1qgzv5swxit4rc9536qybw5&dl=0',

  // Social links
  social: {
    instagram: 'https://instagram.com/kristianazzet',
    facebook: 'https://facebook.com/kristianazzet',
    youtube: 'https://youtube.com/@kristianazzet',
    tiktok: 'https://tiktok.com/@kristianazzet',
    twitter: 'https://x.com/kristianazzet',
    linkedin: 'https://linkedin.com/in/kristianazzet',
  },

  // Music platforms
  music: {
    spotify: 'https://open.spotify.com/artist/yourid',
    soundcloud: 'https://soundcloud.com/kristianazzet',
    mixcloud: 'https://mixcloud.com/kristianazzet',
    youtube: 'https://youtube.com/@kristianazzet',
  },

  // Stats for hero section
  stats: {
    performances: '300+',
    hoursOnDecks: '1,800',
    yearsExperience: '10+',
  },

  // Client logos for Trusted By section
  clients: [
    'Kamstrup', 'Lunar', 'Visma', 'Hummel', 'Danske Commodities',
    'Twoday', 'Aalborg Karneval', 'Jelling Musikfestival', 'Smukfest', 'LEGO'
  ],

  /** Rolling locations marquee */
  locationsMarquee: {
    loopCount: 6,
    durationSec: 36,
    durationHoverSec: 120,
    showsCtaHref: '/shows',
    showsCtaNewTab: false,
  },

  /**
   * Forside: video + tekst (samme familie som FeaturedVideo / Smukfest).
   * Titel: brug \n for linjeskift. Meta = rækken under video (valgfri — udelad tomme felter).
   */
  homeSpotlight: {
    eyebrow: '',
    title: 'SMUKFEST 2022\nAUG 2, TUE',
    body:
      'Skriv din egen tekst her — om aftenen, stemningen, eller hvad du vil dele om optakten til sæsonen. Samme plads som med Smukfest-videoen.',
    videoUrl: '',
    thumbnailUrl: '',
    meta: {
      leftTitle: 'SMUKFEST 2022',
      leftSubtitle: 'AUG 2, TUE',
      centerLabel: 'Livecamp',
      rightLabel: 'Kristian Azzet',
    },
  },

  // Firmafest landing page config
  firmafest: {
    phone: '+45 XX XX XX XX',
    email: 'firmafest@kristianazzet.com',
    calUrl: 'https://cal.com/kristianazzet/firmafest',
    coverage: 'All of Denmark',
  },
};

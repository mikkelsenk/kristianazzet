/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'stone-black': '#0a0a0a',
        'stone-black-dark': '#050505',
        void: '#000000',
        'neon-green': '#DCFF42',
        white: '#FFFFFF',
      },
      fontFamily: {
        display: ['Geomanist', 'system-ui', 'sans-serif'],
        sans: ['Geomanist', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'none': '0',
        'sm': '0',
        DEFAULT: '0',
        'md': '0',
        'lg': '0',
        'xl': '0',
        '2xl': '0',
        '3xl': '0',
        'full': '9999px',
      },
      letterSpacing: {
        'widest': '0.2em',
        'ultra': '0.3em',
      },
      maxWidth: {
        'container': '1200px',
        'container-sm': '1000px',
        'container-md': '1100px',
      },
      keyframes: {
        'hero-ken': {
          '0%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(1.5rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scroll-hint': {
          '0%, 100%': { opacity: '0.35', transform: 'scaleY(0.35)' },
          '50%': { opacity: '1', transform: 'scaleY(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'hero-ken': 'hero-ken 28s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-up': 'fade-up 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scroll-hint': 'scroll-hint 2.2s ease-in-out infinite',
        marquee: 'marquee 56s linear infinite',
      },
    },
  },
  plugins: [],
};

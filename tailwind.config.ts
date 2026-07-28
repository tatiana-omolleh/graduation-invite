import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F5F0',
        forest: '#264B3B',
        sage: '#6E8B74',
        gold: '#C2A46D',
        charcoal: '#2F2F2F',
        muted: '#7A746B',
        borderSubtle: '#DDD6CC',
        taupe: '#A88C6B',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        script: ['var(--font-script)', 'cursive'],
      },
      boxShadow: {
        'luxury': '0 20px 50px -10px rgba(38, 75, 59, 0.08)',
        'envelope': '0 30px 60px -15px rgba(47, 47, 47, 0.12)',
      }
    },
  },
  plugins: [],
};
export default config;
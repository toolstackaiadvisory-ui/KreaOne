import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:      '#F9FAFB',
        surface: '#FFFFFF',
        card:    '#FFFFFF',
        border:  '#E5E7EB',
        orange:  '#FF6A00',
        orange2: '#FF8C38',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'sm': '10px',
        'md': '14px',
        'lg': '16px',
        'xl': '20px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
        'hover':'0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
export default config

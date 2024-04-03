/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#38b6ff',
        secondary: '#38b6ff',
        orange:'#FF8200',
        red:'#FF2826',
        blue:'#1E88E5',
        grey:'#9B9B9B',
      },
      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif'],
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      flexBasis: {
        '3/8': '37.5',
        '5/8': '62.5%',
      },
      keyframes: {
        messageAppear: {
          '0%': { opacity: '0', transform: 'scale(0,0)', transformOrigin: 'bottom right' },
          '50%': { opacity: '0', transform: 'scale(0,0)', transformOrigin: 'bottom right' },
          '75%': { transform: 'scale(1.03, 1.03)', transformOrigin: 'bottom right' },
          '100%': { opacity: '1', transform: 'scale(1, 1)', transformOrigin: 'bottom right' },
        },
        messageDisappear: {
          '0%': { opacity: '1', transform: 'scale(1,1)', transformOrigin: 'bottom right' },
          '50%': { transform: 'scale(1.03, 1.03)', transformOrigin: 'bottom right' },
          '75%': { opacity: '0', transform: 'scale(0,0)', transformOrigin: 'bottom right' },
          '100%': { opacity: '0', transform: 'scale(0, 0)', transformOrigin: 'bottom right' },
        },
        sliderDescription: {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      },
      animation: {
        messageAppear: 'messageAppear 1s ease-in-out ',
        messageDisappear: 'messageDisappear 1s ease-in-out ',
        questionAppear: 'messageAppear 0.5s ease-in-out ',
        sliderDescription: 'sliderDescription 0.4s ease ',
      },
      boxShadow: {
        'chat': '0 4px 12px 0 rgba(0, 0, 0, .15)',
      },
    }
  },
  plugins: [],
}


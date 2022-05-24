module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '15': '3.75rem',
        '17': '5rem',
        '128': '32rem',
        '144': '36rem',
      }
    },
    fontFamily: {
      'pixel': ['VCR', 'system-ui']
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'slate': {
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#0d0d0d',
      },
      'blue': {
        100: '#0e93ff',
        200: '#1097d6',
        300: '#0e5dff',
        400: '#38bdf8',
        500: '#1f233c'
      },
      'white': {
        100: '#f1f1f1'
      }
    },
  },
  plugins: [],
}

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        tilt: 'tilt 10s infinite linear',
      },
      keyframes: {
        tilt: {
          '0%, 50%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(0.5deg)',
          },
          '75%': {
            transform: 'rotate(-0.5deg)',
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('radix-colors-for-tailwind')({
      colors: [
        'tomato',
        'red',
        'crimson',
        'pink',
        'plum',
        'purple',
        'violet',
        'indigo',
        'blue',
        'cyan',
        'teal',
        'green',
        'grass',
        'orange',
        'brown',
        'sky',
        'mint',
        'lime',
        'yellow',
        'amber',
        'gray',
        'mauve',
        'slate',
        'sage',
        'olive',
        'sand',
        'gold',
        'bronze',
      ],
    }),
  ],
};

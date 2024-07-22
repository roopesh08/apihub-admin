// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#4a90e2', // Custom primary color
        secondary: '#50e3c2', // Custom secondary color
        background: '#f5f7fa', // Custom background color
      },
      fontFamily: {
        body: ['"Open Sans"', 'sans-serif'], // Custom font
        heading: ['"Roboto"', 'sans-serif'], // Custom font
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      scale: {
        '0': '0',
        '100': '1',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

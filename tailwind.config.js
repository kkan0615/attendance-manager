module.exports = {
  prefix: 'tw-',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'q-primary': '#FFA726',
        'q-secondary': '#FFE0B2',
        'q-accent': '#F57C00',
        'q-success': '#21BA45',
        'q-info': '#31CCEC',
        'q-warning': '#F2C037',
        'q-danger': '#C10015',
        'q-light': '#f8f9fa',
        'q-dark': '#1D1D1D',
        'sidenav-dark': '#2c323f',
        'status-work': '#21BA45',
        'status-rest': '#F2C037',
        'status-off': '#C10015',
      }
    },
  },
  plugins: [],
}

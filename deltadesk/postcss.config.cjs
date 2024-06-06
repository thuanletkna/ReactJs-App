/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
module.exports = ({ env }) => ({
  plugins: [
    require('tailwindcss')({
      config: './src/css/tailwind.config.js'
    }),    
    require('autoprefixer')()
  ],
})
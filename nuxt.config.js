module.exports = {
  srcDir: './app',
  head: {
    title: 'Factory Hunt - Free website and online catalog for manufacturers and suppliers.',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'index, follow' },
      { hid: 'keywords', name: 'keywords', content: 'factoryhunt, factory, hunt, factory hunt, quote, bulk, wholesale, supplier, factory hunt, online catalog, supplier directory, free website, international trade' },
      { hid: 'description', name: 'description', content: 'Factoryhunt is a B2B website where manufacturers and suppliers can create website and online catalog for free.' },
      { hid: 'og-type', property: 'og:type', content: 'website' },
      { hid: 'og-title', property: 'og:title', content: 'Factory Hunt' },
      { hid: 'og-description', property: 'og:description', content: 'B2B website where manufacturers and suppliers can create website and online catalog for free.' },
      { hid: 'og-image', property: 'og:image', content: 'http://www.factoryhunt.com/logo.png' },
      { hid: 'og-url', property: 'og:url', content: 'https://www.factoryhunt.com' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700' }
    ],
    script: [
      { src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBFBRWKvq4CUEkq5XqbGaSAkajRuEfg25M' },
      { src: '//mozilla.github.io/pdf.js/build/pdf.js' }
    ]
  },
  loading: { color: '#f2583d' },
  css: [
    '~assets/css/index.less',
    '~assets/css/libs/font-awesome-4.7.0/css/font-awesome.min.css'
  ],
  build: {
    vendor: [
      'axios',
      'jquery'
    ],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

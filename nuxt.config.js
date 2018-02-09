module.exports = {
  srcDir: './app',
  head: {
    title: 'Factory Hunt - A Hub for Manufacturer & Supplier Listings',
    titleTemplate: '%s | Factory Hunt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'index, follow' },
      { hid: 'keywords', name: 'keywords', content: 'factoryhunt, factory, hunt, factory hunt, quote, bulk, wholesale, supplier, factory hunt, online catalog, supplier directory, free website, international trade' },
      { hid: 'description', name: 'description', content: 'factoryhunt.com is a free B2B website that helps manufacturers, suppliers, exporters, wholesalers and importers trade with each other.' },
      { hid: 'og-type', property: 'og:type', content: 'website' },
      { hid: 'og-title', property: 'og:title', content: 'Factory Hunt' },
      { hid: 'og-description', property: 'og:description', content: 'A Hub for Manufacturer & Supplier Listings' },
      { hid: 'og-image', property: 'og:image', content: 'http://www.factoryhunt.com/logo.png' },
      { hid: 'og-url', property: 'og:url', content: 'https://www.factoryhunt.com' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700' },
      { rel: 'stylesheet', href: 'https://cdn.quilljs.com/1.0.0/quill.snow.css' }
    ],
    script: [
      { src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBFBRWKvq4CUEkq5XqbGaSAkajRuEfg25M' },
      { src: 'https://cdn.quilljs.com/1.0.0/quill.js' }
    ]
  },
  loading: { color: '#f2583d' },
  css: [
    '~assets/libs/css/font-awesome-4.7.0/css/font-awesome.min.css',
    { src: '~assets/css/index.less', lang: 'less' }
  ],
  plugins: [
    { src: '~plugins/i18n' },
    { src: '~plugins/jquery', ssr: false },
  ],
  router: {
    middleware: [
      'check-authentication'
    ]
  },
  modules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-103072288-1'
    }]
  ],
  build: {
    vendor: [
      'vue-i18n',
      'axios'
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

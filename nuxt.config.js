const axios = require('axios')

module.exports = {
  srcDir: './app',
  head: {
    title: 'Factory Hunt - A Hub for Manufacturer & Supplier Listings',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'index, follow' },
      { hid: 'keywords', name: 'keywords', content: 'factoryhunt, factory, hunt, factory hunt, supplier directory, directory, b2b directory, quote, bulk, wholesale, supplier, factory hunt, online catalog, supplier directory, free website, international trade' },
      { hid: 'description', name: 'description', content: 'factoryhunt.com is a free B2B website that helps manufacturers, suppliers, exporters, wholesalers and importers trade with each other.' },
      { hid: 'og-type', property: 'og:type', content: 'website' },
      { hid: 'og-title', property: 'og:title', content: 'Factory Hunt' },
      { hid: 'og-description', property: 'og:description', content: 'A Hub for Manufacturer & Supplier Listings' },
      { hid: 'og-image', property: 'og:image', content: 'https://s3-us-west-1.amazonaws.com/factoryhunt.com/logo2.png' },
      { hid: 'og-url', property: 'og:url', content: 'https://www.factoryhunt.com' },
      { hid: 'twitter-card', property: 'twitter:card', content: 'summary' },
      { hid: 'twitter-title', property: 'twitter:title', content: 'Factory Hunt' },
      { hid: 'twitter-description', property: 'twitter:description', content: 'A Hub for Manufacturer & Supplier Listings' },
      { hid: 'twitter-image', property: 'twitter:image', content: 'https://s3-us-west-1.amazonaws.com/factoryhunt.com/logo2.png' },
      { hid: 'twitter-domain', property: 'twitter:domain', content: 'https://www.factoryhunt.com' }
    ],
    link: [
      { hid: 'canonical', rel: 'canonical', href: 'https://www.factoryhunt.com' },
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
  modules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-103072288-1'
    }],
    ['@nuxtjs/sitemap']
  ],
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://www.factoryhunt.com',
    cacheTime: 1000 * 60 * 15, // 15 mins
    generate: false,
    exclude: [
      '/404',
      '/pricing',
      '/dashboard',
      '/dashboard/**',
      '/for-supplier/**',
      '/search',
      '/supplier',
      '/inquiry',
      '/verification',
      '/verification/**',
    ],
    async routes () {
      return await axios.get('http://127.0.0.1:3000/api/data/sitemap')
        .then(res => res.data.map(account => {
          if (account.account_status === 'approved') {
            return '/' + account.domain
          } else {
            return '/supplier/' + account.domain
          }
        }))
    }
  },
  plugins: [
    { src: '~plugins/i18n', injectAs: 'i18n' },
    { src: '~plugins/jquery', ssr: false },
  ],
  router: {
    middleware: [
      // 'i18n'
    ]
  },
  build: {
    vendor: [
      'vue-i18n',
      'axios',
      '~/plugins/jquery.js'
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

// const axios = require('axios')
const axios = require('axios')
const structuredData = require('./server/middleware/nuxt/config/structured_data')

const { GOOGLE_ANALYTICS, GOOGLE_MAP_API_KEY } = process.env

module.exports = {
  srcDir: './app',
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'Factory Hunt - A SAFE B2B Wholesale Trading Website',
    meta: [
      { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },

      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      { name: 'robots', content: 'index, follow' },

      { name: 'msvalidate.01', content: 'D2035810FCE2D1D9A6525E9F3359C32B' },

      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'factoryhunt, factory, hunt, factory hunt, supplier directory, directory, b2b directory, quote, bulk, wholesale, supplier, factory hunt, online catalog, supplier directory, free website, international trade'
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'factoryhunt.com is a B2B wholesale trading website that helps manufacturers, suppliers, exporters, wholesalers and importers trade with each other. It is a manufacturer and wholesale supplier directory.'
      },

      { hid: 'og-site_name', property: 'og:site_name', content: 'Factory Hunt' },
      { hid: 'og-type', property: 'og:type', content: 'website' },
      { hid: 'og-title', property: 'og:title', content: 'Factory Hunt' },
      {
        hid: 'og-description',
        property: 'og:description',
        content: 'A SAFE B2B Wholesale Trading Website'
      },
      {
        hid: 'og-image',
        property: 'og:image',
        content: 'https://s3-us-west-1.amazonaws.com/factoryhunt.com/admin/thumbnail_eng.png'
      },
      { hid: 'og-url', property: 'og:url', content: 'https://www.factoryhunt.com' },

      { hid: 'twitter-site', property: 'twitter:site', content: '@factoryhunt' },
      { hid: 'twitter-card', property: 'twitter:card', content: 'summary' },
      { hid: 'twitter-title', property: 'twitter:title', content: 'Factory Hunt' },
      {
        hid: 'twitter-description',
        property: 'twitter:description',
        content: 'A SAFE B2B Wholesale Trading Website'
      },
      {
        hid: 'twitter-image',
        property: 'twitter:image',
        content: 'https://s3-us-west-1.amazonaws.com/factoryhunt.com/admin/thumbnail_eng.png'
      },
      { hid: 'twitter-domain', property: 'twitter:domain', content: 'https://www.factoryhunt.com' }
    ],
    link: [
      { hid: 'canonical', rel: 'canonical', href: 'https://www.factoryhunt.com' },
      { rel: 'alternate', hreflang: 'en', href: 'https:www.factoryhunt.com' },
      { rel: 'alternate', hreflang: 'ko', href: 'https:www.factoryhunt.co.kr' },

      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700'
      },
      { rel: 'stylesheet', href: 'https://cdn.quilljs.com/1.0.0/quill.snow.css' }
    ],
    script: [
      {
        src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBFBRWKvq4CUEkq5XqbGaSAkajRuEfg25M'
      },
      { src: 'https://cdn.quilljs.com/1.0.0/quill.js' },
      { type: 'application/ld+json', innerHTML: JSON.stringify(structuredData) }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },
  loading: { color: '#f2583d' },
  css: [
    '~assets/libs/css/font-awesome-4.7.0/css/font-awesome.min.css',
    { src: '~assets/css/index.less', lang: 'less' }
  ],
  modules: [
    '@nuxtjs/sitemap',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-103072288-1'
      }
    ]
  ],
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://www.factoryhunt.com',
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: false, // Enable me when using nuxt generate
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
      '/verification/**'
    ],
    routes: async () => {
      const api = 'http://127.0.0.1:3000/api/data/sitemap'

      const { data } = await axios.get(api)
      return data
    }
  },
  plugins: [{ src: '~plugins/i18n', injectAs: 'i18n' }, { src: '~plugins/jquery', ssr: false }],
  build: {
    vendor: ['vue-i18n', 'axios', '~/plugins/jquery.js'],
    extend(config, { isDev, isClient }) {
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

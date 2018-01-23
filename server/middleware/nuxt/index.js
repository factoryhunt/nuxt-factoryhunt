const { Nuxt, Builder } = require('nuxt')
const config = require('../../../nuxt.config')

const isProd = process.env.NODE_ENV === 'production'

const nuxt = new Nuxt(config)
if (!isProd) {
  const builder = new Builder(nuxt)
  builder.build()
}

module.exports = nuxt

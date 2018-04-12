import { decodeToken, destoryAuthSession } from '~/utils/auth'
import { saveLocale } from '~/utils/i18n'

// window.fetch()를 위한 Polyfill
require('whatwg-fetch')

export const state = () => ({
})

export const getters = () => ({
})

export const mutations = {
}

export const actions = {
  // This method will be called when user route "location.href" & "nuxt-link"
  async nuxtServerInit ({ commit }, { app, req, query }) {
    console.log('nuxt server init')

    if (req.session.locale) saveLocale(req, req.session.locale)

    if (query.lang) saveLocale(req, query.lang)

    try {

      if (req.session && req.session.auth) {
        const token = req.session.auth.token
        const user = await decodeToken(token)
        const payload = {
          user
        }
        commit('auth/login', payload)
      }

      // var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
      // console.log(fullUrl)
      // if(req.originalUrl.indexOf('%') !== -1 ) {
      //   redirect(fullUrl)
      // }
    } catch (err) {
      console.log('User token is expired.')
      destoryAuthSession(req)
    }
  }
}

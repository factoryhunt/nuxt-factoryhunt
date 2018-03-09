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
  async nuxtServerInit ({ commit }, { app, req, store }) {
    console.log('nuxt server init')
    console.log('nuxt server session:', req.session)
    console.log('nuxt server i18n in store', store.state.i18n)

    const locale = req.session.locale || store.state.i18n.locale
    saveLocale(req, locale)

    try {

      if (req.session && req.session.auth) {
        const token = req.session.auth.token
        const user = await decodeToken(token)
        const payload = {
          user
        }
        commit('auth/login', payload)
      }

    } catch (err) {
      console.log('User token is expired.')
      destoryAuthSession(req)
    }
  }
}

import { decodeToken } from '~/utils/auth'

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
  async nuxtServerInit ({ commit }, { req }) {
    console.log('nuxt server init')
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
    }
  }
}

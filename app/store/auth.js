import axios from '~/plugins/axios'
import { getToken, decodeToken, storeLoginHistory } from '~/utils/auth'
// import store from './index'
// import router from '../../router'

export const state = () => ({
  user: null
})

export const getters = {
  GET_ACCOUNT: state => {
    return state.user ? state.user.account : {}
  },
  GET_CONTACT: state => {
    return state.user ? state.user.contact : {}
  },
  GET_USER: state => {
    return state.user
  },
  isLoggedIn: state => {
    return state.user !== null
  },
  IS_LOGGED_IN: state => {
    return state.user !== null
  },
  IS_USER_ADMIN: state => {
    if (state.user) return state.user.account.account_type.indexOf('Admin') > -1
    else return false
  },
  IS_USER_BUYER: state => {
    if (state.user) return state.user.account.account_type.indexOf('Buyer') > -1
    else return false
  },
  IS_USER_SUPPLIER: state => {
    if (state.user) return state.user.account.account_type.indexOf('Supplier') > -1
    else return false
  }
}

export const mutations = {
  login(state, payload) {
    state.user = payload.user
  },
  clearAuthData(state) {
    state.user = null
  }
}

export const actions = {
  async login({ commit }, payload) {
    const { email, password } = payload

    const token = await getToken(email, password)
    const user = await decodeToken(token)
    await storeLoginHistory(user.contact.contact_id)

    commit('login', {
      user
    })
  },
  signUp({ dispatch }, payload) {
    const data = {
      company: payload.company,
      email: payload.email,
      password: payload.password
    }
    const register = () => {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/auth/register', data)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
    const login = () => {
      return new Promise((resolve, reject) => {
        dispatch('login', {
          email: payload.email,
          password: payload.password
        })
          .then(() => {
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
    const sendVerifyEmail = () => {
      return new Promise((resolve, reject) => {
        const data = {
          email: payload.email,
          subject: 'Please verify your email.'
        }
        axios
          .post('/api/mail/sign_up', data)
          .then(() => {
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
    return new Promise(async (resolve, reject) => {
      try {
        const data = await register()
        await login()
        sendVerifyEmail()
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .delete('/api/auth/logout')
        .then(() => {
          commit('clearAuthData')
          resolve()
        })
        .catch(() => {
          reject()
        })
    })
  }
}

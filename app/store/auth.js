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
  GET_USER_NAME: state => {
    if (!state.user) return 'Unknown'

    const { first_name, last_name } = state.user.contact
    const { account_name } = state.user.account

    if (first_name && last_name) return `${first_name} ${last_name}`
    if (first_name) return first_name
    if (last_name) return last_name

    return account_name || 'Unknown'
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
  },
  IS_MEMBERSHIP_USER: state => {
    if (state.user) {
      return state.user.account.membership_left_time > 0
    } else return false
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
      lead_id: payload.lead_id,
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
    const convert = () => {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/auth/convert_buyer', data)
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
      let result
      try {
        if (payload.lead_id > 0) await convert()
        else result = await register()
        await login()
        sendVerifyEmail()
        resolve(result)
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

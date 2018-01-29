// import cookie from '../../assets/js/cookie'
import axios from '~/plugins/axios'
import { setToken, unsetToken } from '../utils/auth'
// import store from './index'
// import router from '../../router'

export const state = () => ({
  token: null,
  user: null
})

export const getters = {
  isLoggedIn: state => {
    return state.user !== null
  },
  GET_ACCOUNT: state => {
    return state.user ? state.user.account : {}
  },
  GET_CONTACT: state => {
    return state.user ? state.user.contact : {}
  },
  GET_USER: state => {
    return state.user
  }
}

export const mutations = {
  login (state, payload) {
    state.token = payload.token
    state.user = payload.user
  },
  clearAuthData (state) {
    state.token = null
    state.user = null
  }
}

export const actions = {
  login ({commit}, payload) {
    const data = {
      email: payload.email,
      password: payload.password
    }
    return new Promise((resolve, reject) => {
      axios.post('/api/auth/login', data)
        .then(res => {
          const token = res.data.token
          setToken(token)
          resolve()
        })
        .catch((err) => {
          reject(err.response)
        })
    })
  },
  signUp ({dispatch}, payload) {
    const data = {
      company: payload.company,
      email: payload.email,
      password: payload.password
    }
    const register = () => {
      return new Promise((resolve, reject) => {
        axios.post('/api/auth/register', data)
          .then((res) => { resolve(res.data) })
          .catch(err => { reject(err) })
      })
    }
    const sendVerifyEmail = () => {
      return new Promise((resolve, reject) => {
        const data = {
          email: payload.email,
          subject: 'Please verify your email.'
        }
        axios.post('/api/mail/signup', data)
          .then(() => { resolve() })
          .catch(err => { reject(err) })
      })
    }
    const login = () => {
      return new Promise((resolve, reject) => {
        dispatch('login', {
          email: payload.email,
          password: payload.password
        })
          .then(() => { resolve() })
          .catch((err) => { reject(err) })
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
  logout ({commit}) {
    return new Promise((resolve, reject) => {
      axios.delete('/api/auth/logout')
        .then(() => {
          unsetToken()
          commit('clearAuthData')
          resolve()
        })
        .catch(() => {
          reject()
        })
    })
  }
}

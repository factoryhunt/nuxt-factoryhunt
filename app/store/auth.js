// import cookie from '../../assets/js/cookie'
import axios from 'axios'
import store from './index'
// import router from '../../router'

export const state = () => ({
  token: null,
  accountId: null,
  contactId: null
})

export const getters = {
  getAccountId: state => {
    return state.accountId
  },
  getContactId: state => {
    return state.contactId
  },
  isLoggedIn: state => {
    return state.token !== null
  }
}

export const mutations = {
  login (state, payload) {
    state.token = payload.token
    state.accountId = payload.user.account_id
    state.contactId = payload.user.contact_id
  },
  clearAuthData (state) {
    state.token = null
    state.accountId = false
    state.contactId = false
  },
  testMutation () {
    console.log('test mutation called')
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
          const user = res.data.user
          commit('login', {
            token,
            user
          })
          localStorage.setItem('token', token)
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
    return new Promise((resolve) => {
      location.reload()
      localStorage.removeItem('token')
      commit('clearAuthData')
      resolve()
    })
  },
  autoLogin () {
    return new Promise((resolve, reject) => {
      checkToken()
        .then(res => {
          Promise.all([
            fetchContactDataById(res.cid),
            fetchAccountDataById(res.id)
          ]).then(result => {
            resolve(result)
          }).catch(err => {
            reject(err.response)
          })
        })
        .catch(err => {
          reject(err.response)
        })
    })
  },
  testAction ({commit}, payload) {
    console.log('test actions called')
    console.log('payload: ', payload)
    commit('testMutation')
  }
}

function checkToken () {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('token')
    // if (!token) {
    //   reject()
    // }
    const data = {
      headers: { 'x-access-token': token }
    }
    axios.get('/api/auth/check', data)
      .then((res) => {
        const accountId = res.data.info.id
        const contactId = res.data.info.cid
        store.commit('login', {
          token,
          user: {
            account_id: accountId,
            contact_id: contactId
          }
        })
        resolve(res.data.info)
      })
      .catch((err) => {
        reject(err.response)
      })
  })
}

function fetchContactDataById (id) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/data/contact/${id}`)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err.response)
      })
  })
}
function fetchAccountDataById (id) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/data/account/${id}`)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err.response)
      })
  })
}

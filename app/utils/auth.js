import axios from '~/plugins/axios'

export const setToken = (token) => {
  if (process.server) return
  window.localStorage.setItem('token', token)
}

export const unsetToken = (token) => {
  if (process.server) return
  window.localStorage.remove('token')
}

export const getToken = () => {
  if (process.server) return
  return window.localStorage.getItem('token')
}

export const getTokenFromSession = (req) => {
  if (!req.session.auth) return
  return {
    token: req.session.auth.token
  }
}

export const decodeToken = (token) => {
  console.log('decode token starts with', token)
  return new Promise((resolve, reject) => {
    const data = {
      headers: { 'x-access-token': token }
    }
    axios.get('/api/auth/check', data)
      .then(res => {
        resolve({
          user: res.data.user
        })
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const getUserDataFromLocalStorage = () => {
  return new Promise((resolve, reject) => {
    const data = {
      headers: { 'x-access-token': getToken() }
    }
    axios.get('/api/auth/check', data)
      .then(res => {
        resolve({
          user: res.data.user
        })
      })
      .catch(err => {
        reject(err)
      })
  })
}

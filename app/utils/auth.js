import axios from '~/plugins/axios'

export const setToken = (token) => {
  if (process.server) return
  window.localStorage.setItem('token', token)
}

export const unsetToken = () => {
  if (process.server) return
  window.localStorage.removeItem('token')
}

export const getTokenFromSession = (req) => {
  if (!req.session.auth) return ''
  return req.session.auth.token
}

export const getToken = (email, password) => {
  return new Promise((resolve, reject) => {
    const data = {
      email,
      password
    }
    axios.post('/api/auth/login', data)
      .then(res => {
        resolve(res.data.token)
      })
      .catch(err => {
        reject(err.response)
      })
  })
}

export const decodeToken = (token) => {
  return new Promise((resolve, reject) => {
    const data = {
      headers: { 'x-access-token': token }
    }
    axios.get('/api/auth/check', data)
      .then(res => {
        if (!res.data.user.account) reject()
        resolve(res.data.user)
      })
      .catch(() => {
        reject({msg: 'Decoding Token Failed.'})
      })
  })
}

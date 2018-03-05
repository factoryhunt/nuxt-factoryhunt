import axios from '~/plugins/axios'

export const setToken = (token) => {
  if (process.server) return
  window.localStorage.setItem('token', token)
}

export const unsetToken = () => {
  if (process.server) return
  window.localStorage.removeItem('token')
}

export const getToken = () => {
  if (process.server) return
  return window.localStorage.getItem('token')
}

export const getTokenFromSession = (req) => {
  if (!req.session.auth) return
  return req.session.auth.token
}

export const decodeToken = (token) => {
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
        unsetToken()
        reject(err)
      })
  })
}

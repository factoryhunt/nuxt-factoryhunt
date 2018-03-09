import axios from '~/plugins/axios'

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

export const destoryAuthSession = (req) => {
  delete req.session.auth
  console.log('User session is destroyed.')
}

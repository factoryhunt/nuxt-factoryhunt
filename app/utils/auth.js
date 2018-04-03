import axios from '~/plugins/axios'

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

export const getUserTokenFromSession = () => {
  return new Promise((resolve, reject) => {
    axios.get('/api/auth/user_token')
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
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

export const updateUserDataToVuex = async (store) => {
  try {
    const { data: token } = await getUserTokenFromSession()
    const user = await decodeToken(token)
    store.commit('auth/login', {
      user
    })
  } catch (err) {
    return err
  }
}

export const destoryAuthSession = (req) => {
  delete req.session.auth
  console.log('User session is destroyed.')
}

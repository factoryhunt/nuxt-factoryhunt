import { getTokenFromSession, getToken, decodeToken } from '~/utils/auth'

export default async ({store, req}) => {
  // If nuxt generate, pass this middleware
  if (process.server && !req) return

  const token = process.server ? getTokenFromSession(req) : getToken()
  if (!token) return

  try {
    const { data } = await decodeToken(token)
    console.log('token result: ', data)
    store.commit('auth/login', result)
  } catch (err) {
    console.log(err)
  }
}

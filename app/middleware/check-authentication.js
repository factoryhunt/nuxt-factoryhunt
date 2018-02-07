import { getTokenFromSession, getToken, unsetToken, decodeToken } from '~/utils/auth'

export default async ({store, req}) => {
  // If nuxt generate, pass this middleware
  if (process.server && !req) return

  const token = process.server ? getTokenFromSession(req) : getToken()
  if (!token) return

  try {
    const { user } = await decodeToken(token)
    store.commit('auth/login', {
      token,
      user
    })
  } catch (err) {
    unsetToken()
    delete req.session.auth
  }
}

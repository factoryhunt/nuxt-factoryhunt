import { getTokenFromSession, getToken, unsetToken, decodeToken } from '~/utils/auth'

export default async ({store, req, redirect}) => {
  // If nuxt generate, pass this middleware
  if (process.server && !req) return

  const token = process.server ? getTokenFromSession(req) : getToken()
  // const token = getTokenFromSession(req)
  if (!token) return

  try {
    const { user } = await decodeToken(token)
    store.commit('auth/login', {
      token,
      user
    })
  } catch (err) {
    console.log(err)
    unsetToken()
    delete req.session.auth
    redirect('/login')
  }
}

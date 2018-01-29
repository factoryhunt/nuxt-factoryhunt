export const setLocale = (locale) => {
  if (process.server) return
  window.localStorage.setItem('locale', locale)
}

export const unsetLocale = () => {
  if (process.server) return
  window.localStorage.removeItem('locale')
}

export const getLocale = () => {
  if (process.server) return
  return window.localStorage.getItem('locale')
}

export const getLocaleFromSession = (req) => {
  if (!req.session.auth) return
  return req.session.auth.token
}

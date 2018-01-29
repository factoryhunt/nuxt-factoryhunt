export const setLocale = (locale) => {
  if (process.server) return
  window.localStorage.setItem('locale', locale)
}

export const unsetlocale = () => {
  if (process.server) return
  window.localStorage.removeItem('locale')
}

export const getlocale = () => {
  if (process.server) return
  return window.localStorage.getItem('locale')
}

export const getlocaleFromSession = (req) => {
  if (!req.session.auth) return
  return req.session.auth.token
}

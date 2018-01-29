export default function ({ isHMR, query, app, store, error }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return
  // Get locale from params
//   const locale = params.lang || 'eng'
//   if (store.state.i18n.locales.indexOf(locale) === -1) {
//     return error({ message: 'This page could not be found.', statusCode: 404 })
//   }
//   // Set locale
//   store.commit('i18n/SET_LANG', locale)
//   app.i18n.locale = store.state.i18n.locale
}

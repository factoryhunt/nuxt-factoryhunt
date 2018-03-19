import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, req, query, store, }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  const { kor, eng } = require('~/locales')
  let locale = store.state.i18n.locale || 'eng'

  if (process.server) locale = req.session.locale || locale

  if (query.lang) locale = query.lang

  const i18n = new VueI18n({
    fallbackLocale: 'eng',
    locale,
    messages: {
      eng,
      kor
    }
  })
  app.i18n = i18n

  const payload = {
    locale: locale,
    i18n
  }

  store.commit('i18n/SET_LANG', payload)
}

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { setLocale, getLocale } from '~/utils/i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  const locale = getLocale() || store.state.i18n.locale
  const { kor, eng } = require('~/locales')

  if (!getLocale()) {
    setLocale(locale)
  }

  store.commit('i18n/SET_LANG', locale)
  app.i18n = new VueI18n({
    locale: locale,
    fallbackLocale: 'eng',
    messages: {
      eng,
      kor
    }
  })
}

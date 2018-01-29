import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  const { kor, eng } = require('~/locales')

  app.i18n = new VueI18n({
    locale: store.state.i18n.locale,
    fallbackLocale: 'eng',
    messages: {
      eng,
      kor
    }
  })
}

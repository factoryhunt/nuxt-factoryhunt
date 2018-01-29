import { setLocale } from '~/utils/i18n'

export const state = () => ({
  locales: ['eng', 'kor'],
  locale: 'eng'
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
      setLocale(locale)
    }
  }
}

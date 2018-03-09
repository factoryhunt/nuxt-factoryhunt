export const state = () => ({
  locales: ['eng', 'kor'],
  locale: 'eng'
})

export const mutations = {
  SET_LANG(state, payload) {
    const {
      locale,
      i18n
    } = payload
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
      i18n.locale = locale
    }
  }
}

import axios from '~/plugins/axios'

export const saveLocale = (req, locale) => {
  req.session.locale = locale
}

export const setLocaleOnServerSession = (locale) => {
  const data = {
    locale
  }
  axios.post('/api/i18n', data)
}

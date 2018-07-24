const host = process.env.DAUM_HOST || 'smtp.daum.net'
const port = process.env.DAUM_PORT || 465
const secure = true // true for 465, false for other ports
const password = process.env.DAUM_PASSWORD || 'YOUR_DAUM_SMTP_PASSWORD'

module.exports = {
  info: {
    host: host,
    port: port,
    secure: secure,
    auth: {
      user: process.env.MAIL_INFO || 'YOUR_INFO_EMAIL',
      pass: password
    }
  },
  noreply: {
    host: host,
    port: port,
    secure: secure,
    auth: {
      user: process.env.MAIL_NO_REPLY || 'YOUR_NO_REPLY_EMAIL',
      pass: password
    }
  },
  daniel: {
    host: host,
    port: port,
    secure: secure,
    auth: {
      user: process.env.MAIL_CEO || 'YOUR_CEO_EMAIL',
      pass: password
    }
  }
}

const host = 'smtp.daum.net'
const port = 465
const secure = true // true for 465, false for other ports
const password = 'Ycombinator2017'
module.exports = {
  info: {
    host: 'smtp.daum.net',
    port: port,
    secure: secure,
    auth: {
      user: 'factory.info',
      pass: password
    }
  },
  noreply: {
    host: host,
    port: port,
    secure: secure,
    auth: {
      user: 'factory.noreply',
      pass: password
    }
  }
}
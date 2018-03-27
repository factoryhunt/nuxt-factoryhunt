const host = 'smtp.daum.net'
const port = 465
const secure = true // true for 465, false for other ports
const password = 'Ycombinator2017'
module.exports = {
  info: {
    host: host,
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
  },
  daniel: {
    host: host,
    port: port,
    secure: secure,
    auth: {
      user: 'factory.daniel',
      pass: password
    }
  }
}

const Raven = require('raven')
const DSN = 'https://eac0ae1884fb48bab88fa6646e15c0c8@sentry.io/1194051'

Raven.config(DSN).install((err, initialErr, eventId) => {
  console.error(err)
  process.exit(1)
})

module.exports = Raven

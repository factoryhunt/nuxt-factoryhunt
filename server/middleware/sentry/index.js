const Raven = require('raven')
const DSN = process.env.SENTRY_DSN || 'YOUR_SENTRY_DSN'

Raven.config(DSN).install((err, initialErr, eventId) => {
  console.error(err)
  process.exit(1)
})

module.exports = Raven

module.exports = (session) => {
  const connectRedis = require('connect-redis')
  const RedisStore = connectRedis(session)

  return {
    resave: false,
    saveUninitialized: false,
    secret: 'cOm.FaCtOrYhUnT.wWw',
    name: 'redisStore',
    cookie: {
      httpOnly: true,
      secure: false,
    },
    store: new RedisStore({
      host: 'localhost',
      port: '6379',
      logErrors: true
    })
  }
}

// Express-session example
// app.use(session({
//   secret: CONFIG.sessionKey,
//   resave: false,
//   saveUninitialized: false,
//   cookie: { maxAge: 60 * 60 * 3600 }
// }))

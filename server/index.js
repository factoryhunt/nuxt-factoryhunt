process.env.DEBUG = 'nuxt:*'
const app = require('express')()

const session = require('express-session')
const connectRedis = require('connect-redis')
const RedisStore = connectRedis(session)
const nuxt = require('./middleware/nuxt')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const api = require('./api')

const CONFIG = require('./api/.config')
const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 3000
const sess = {
  resave: false,
  saveUninitialized: false,
  secret: CONFIG.sessionKey,
  name: 'redisSession',
  cookie: {
    httpOnly: true,
    secure: false,
  },
  store: new RedisStore({ url: '레디스 호스팅 주소', logErrors: true }),
}

// Middlewares
app.set('jwt-token', CONFIG.jwtSecret)
app.use(session(sess))
// app.use(session({
//   secret: CONFIG.sessionKey,
//   resave: false,
//   saveUninitialized: false,
//   cookie: { maxAge: 60 * 60 * 3600 }
// }))
app.use(morgan('dev'))
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', api)
app.use(nuxt.render)

app.listen(PORT)
console.log(`Server is listening on http://${HOST}:${PORT}`)

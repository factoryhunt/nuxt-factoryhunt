// process.env.DEBUG = 'nuxt:*'
require('./middleware/spawn')

const app = require('express')()
const server = require('http').createServer(app)

const forcedomain = require('./middleware/forcedomain')
const session = require('express-session')
const redis = require('./middleware/redis/.config')(session)
const nuxt = require('./middleware/nuxt')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const api = require('./api')
require('./middleware/socket')(server)

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 3000

// Middlewares
app.use(session(redis))
app.use(morgan('dev'))
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// APIs
app.use('/api', api)
app.use(forcedomain)
app.use(nuxt.render)

server.listen(PORT, err => {
  if (err) console.log(err)

  console.log(`Server is listening on http://${HOST}:${PORT}`)
})

// process.env.DEBUG = 'nuxt:*'
const app = require('express')()

const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
const session = require('express-session')
const redis = require('./middleware/redis/.config')(session)
const nuxt = require('./middleware/nuxt')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const api = require('./api')

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
app.use(redirectToHTTPS([/localhost:(\d{4})/, /amazonaws.com/], [/\/insecure/]))
app.use(nuxt.render)

app.listen(PORT)
console.log(`Server is listening on http://${HOST}:${PORT}`)

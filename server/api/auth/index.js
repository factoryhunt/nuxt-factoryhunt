const router = require('express').Router()

const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const check = require('./check')
const verify = require('./verify')
const user_token = require('./user_token')
const authMiddleware = require('../middleware/auth')

router.post('/register', register)
router.post('/login', login)
router.delete('/logout', logout)

router.get('/check', authMiddleware, check)
router.get('/user_token', user_token)

router.get('/email_verify', verify)

module.exports = router

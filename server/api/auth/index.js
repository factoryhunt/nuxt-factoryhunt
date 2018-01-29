const router = require('express').Router()

const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const check = require('./check')
const verify = require('./verify')
const authMiddleware = require('../middleware/auth')

router.post('/register', register)
router.post('/login', login)
router.delete('/logout', logout)

router.get('/check', authMiddleware, check)

router.get('/email_verify', verify)

module.exports = router

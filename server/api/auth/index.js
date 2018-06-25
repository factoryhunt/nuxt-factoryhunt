const router = require('express').Router()

const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const remove = require('./remove')
const check = require('./check')
const verify = require('./verify')
const forgot_password = require('./forgot_password')
const user_token = require('./user_token')
const authMiddleware = require('../middleware/auth')
const convert_buyer = require('./convert/buyer')

router.post('/register', register)
router.post('/login', login)
router.post('/remove', remove)
router.delete('/logout', logout)

router.get('/check', authMiddleware, check)
router.get('/user_token', user_token)

router.get('/email_verify', verify)
router.post('/forgot_password', forgot_password)

router.post('/convert_buyer', convert_buyer)

module.exports = router

const mysql = require('../mysql')
const CONFIG_MYSQL = require('../mysql/model')
const config = require('../.config')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

// POST /api/auth/login
module.exports = (req, res) => {
  const email = req.body.email.toLowerCase()
  const password = req.body.password

  mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_CONTACTS} WHERE lower(contact_email) = "${email}"`,
    (err, users) => {
      if (err) throw err

      const user = users[0]

      // checking user existing
      // both expression are accepted
      // if (users.length < 1) return res.status(403).json({msg: 'email is not exist'})
      if (!user) return res.status(401).json({result: false, code: 8001, msg: 'Email does not exist.', msg_kor: '존재하지 않는 이메일입니다.'})

      // DB에 패스워드 길이가 50글자로 제한되어 있었음.
      crypto.pbkdf2(password, user.password_salt, 100000, 64, 'sha512', function (err, key) {
        if (err) return res.send(err)
        const result = key.toString('base64') === user.password

        // password is incorrect
        if (!result) return res.status(401).json({result: false, code: 8002, msg: 'Password is incorrect.', msg_kor: '비밀번호가 일치하지 않습니다.'})

        // authorization
        //jwt Usage: jwt.sign(payload, secret, options, [callback])
        const payload = {
          account_id: user.account_id,
          contact_id: user.contact_id
        }
        const options = {
          // expiresIn: '7d', // default: null
          issuer: 'factoryhunt.com',
          subject: 'user_id'
        }
        jwt.sign(payload, config.jwtSecret, options,
          (err, token) => {
            if (err) res.status(401).json({result: false, code: 8003})
            req.session.auth = {
              token
            }
            res.status(200).json({
              token
            })
          })
      })
    })
}

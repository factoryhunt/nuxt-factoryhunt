const mysql = require('../mysql')
const jwt = require('jsonwebtoken')
const secret = require('../.config').jwtSecret

// GET /api/auth/email_verify?id=
module.exports = async (req, res) => {
  const token = req.headers['x-access-token'] || req.query.id
  const {hostname, protocol} = req
  console.log('token: ', token)
  console.log('protocol: ', protocol)
  console.log('hostname: ', hostname)

  // const domain = `${protocol}://${hostname} === http://${hostname}`
  // if (!domain) return ({
  //   msg: 'Wrong access.',
  //   msg_kor: '잘못된 접근입니다.'
  // })

  const verifyToken = () => {
    return new Promise((resolve, reject) => {
      jwt.verify(id, secret, (err, decoded) => {
        if (err) reject({
          result: false,
          msg: 'token is not valid',
          msg_kor: '인증 정보가 유효하지 않습니다.'
        })
        resolve(decoded)
      })
    })
  }

  // const updateDataToDB = () => {
  //   return new Promise((resolve, reject) => {
  //     mysql.query(`UPDATE contacts_copy SET ? WHERE contact_id = ${contact_id}`, (err, result) => {
  //       if (err) reject(err)
  //       resolve(result)
  //     })
  //   })
  // }

  const onSuccess = () => {
    // res.status(200).json({
    //   result: true,
    //   msg: 'Email has been verified.',
    //   msg_kor: '이메일이 승인되었습니다.'
    // })
    res.redirect('/verification/email')
  }

  const onError = (err) => {
    res.status(200).json({
      result: true,
      msg: err.msg,
      msg_kor: err.msg_kor
    })
  }

  onSuccess()
}

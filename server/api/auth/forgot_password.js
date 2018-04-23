const mysql = require('../mysql')
const CONFIG_MYSQL = require('../mysql/model')
const { publishToken } = require('../../utils/jwt')
const { danielMailer, noreplyMailer } = require('../../middleware/mailer')

// POST /api/auth/forgot_password
module.exports = async (req, res) => {
  let { email } = req.body
  email = email ? email.toLowerCase() : ''

  const checkEmail = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`
      SELECT 
      * 
      FROM 
      ${CONFIG_MYSQL.TABLE_CONTACTS} 
      WHERE 
      lower(contact_email) = "${email}" AND
      isDeleted != 1
      `, (err, rows) => {
          // mysql error
        if (err) reject({ msg: 'Internal server error. Please try again later.' })
        
          // email does not exist
        if (!rows.length) reject({ msg: 'The email does not exist.' })

          // email exists
          resolve()
        })
    })
  }

  const postMail = () => {
    const message = {
      from: 'Factory Hunt <noreply@factoryhunt.com>',
      to: email,
      subject: 'Please reset your password.',
      html: 'Please reset your password.'
    }

    return new Promise((resolve, reject) => {
      noreplyMailer.sendMail(message, (err, info) => {
        if (err) reject(err)
        resolve(info)
      })
    })
  }

  try {
    await checkEmail()
    await postMail()
    res.status(200).json({msg:'Reset password email is sent successfully.'})
  } catch (err) {
    console.log(err)
    res.status(403).json({msg: err.msg})
  }
}

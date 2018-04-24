const mysql = require('../../../../../mysql/index')
const CONFIG_MYSQL = require('../../../../../mysql/model')
const crypto = require('crypto')

// PUT /api/data/contact/:contact_id/password_change
module.exports = async (req, res) => {
  const contact_id = req.params.contact_id
  const { contact_data } = req.body

  const checkPasswordSame = () => {
    if (contact_data.new_password !== contact_data.new_password_confirm) {
      throw {
        code: '8001',
        msg: 'New passwords do not match.',
        msg_kor: '새로운 비밀번호가 서로 일치하지 않습니다.'
      }
    }
  }

  const checkPasswordLength = () => {
    if (contact_data.new_password.length < 8) {
      throw {
        code: '8002',
        msg: 'The new password is too short.',
        msg_kor: '새로운 비밀번호가 너무 짧습니다.'
      }
    }
  }

  const fetchContactData = () => {
    return new Promise((resolve, reject) => {
      mysql.query(
        `
        SELECT 
        password, 
        password_salt 
        FROM 
        ${CONFIG_MYSQL.TABLE_CONTACTS} 
        WHERE contact_id = ${contact_id}
        `,
        (err, result) => {
          if (err) reject(err)
          resolve(result[0])
        }
      )
    })
  }

  const checkPassword = (password, salt) => {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(contact_data.password, salt, 100000, 64, 'sha512', (err, key) => {
        if (err) reject(err)
        const result = key.toString('base64') === password

        // password is incorrect
        if (!result)
          reject({
            code: '8003',
            msg: 'Password is incorrect.',
            msg_kor: '비밀번호가 일치하지 않습니다.'
          })

        resolve()
      })
    })
  }

  const encryptPassword = () => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(64, (err, buf) => {
        //randomBtyes로 salt를 생성 -> buf로 바꿈
        crypto.pbkdf2(
          contact_data.new_password,
          buf.toString('base64'),
          100000,
          64,
          'sha512',
          (err, key) => {
            if (err)
              reject({
                code: '8004',
                msg: 'Encrypting password failed.',
                msg_kor: '비밀번호 암호화 실패.'
              })
            const password = key.toString('base64')
            const salt = buf.toString('base64')
            resolve({
              password,
              salt
            })
          }
        )
      })
    })
  }

  const dataUpdateToDB = (password, salt) => {
    return new Promise((resolve, reject) => {
      const data = {
        password: password,
        password_salt: salt
      }
      mysql.query(
        `
      UPDATE 
      ${CONFIG_MYSQL.TABLE_CONTACTS} 
      SET 
      ?,
      last_modified_date = (SELECT NOW()) 
      WHERE 
      contact_id = ${contact_id}`,
        data,
        err => {
          if (err) reject()

          resolve()
        }
      )
    })
  }

  const onSuccess = () => {
    res.status(200).json({
      result: true,
      msg: 'Password has been changed successfully.',
      msg_kor: '비밀번호가 성공적으로 변경되었습니다.'
    })
  }

  const onError = err => {
    res.status(403).json({
      result: false,
      code: err.code,
      msg: err.msg,
      msg_kor: err.msg_kor
    })
  }

  try {
    checkPasswordLength()
    checkPasswordSame()
    const contact = await fetchContactData()
    if (contact_data.password) await checkPassword(contact.password, contact.password_salt)
    const encrypt = await encryptPassword()
    await dataUpdateToDB(encrypt.password, encrypt.salt)
    await onSuccess()
  } catch (err) {
    console.log(err)
    onError(err)
  }
}

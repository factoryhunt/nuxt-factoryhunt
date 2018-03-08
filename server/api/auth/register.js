const mysql = require('../mysql')
const crypto = require('crypto')
const CONFIG_MYSQL = require('../mysql/model')

// POST /api/auth/register
module.exports = async (req, res) => {
  // variables
  const company = (req.body.company).replace(/^\s+|\s+$/g, '')
  const handled_company = company.replace(/ /g, '-').toLowerCase().replace(/\./g, '').replace(/\,/g, '').replace(/\(/g, '').replace(/\)/g, '')
  const email = req.body.email
  var password = req.body.password

  var password_salt = ''
  var lead = {}
  var lead_update = {}
  var account = {}
  var account_update = {}
  var contact = {}
  var last_lead_id = null
  var last_account_id = null
  var last_contact_id = null

  // promises
  const checkEmail = () => {
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT * FROM ${CONFIG_MYSQL.TABLE_CONTACTS} WHERE lower(contact_email) = ?`, email, (err, rows) => {
        // checking email error
        if (err) reject({result: false, msg: 'Checking email failed.', msg_kor: '서버 오류. 다시 시도해주세요.'})
        // email is already exist
        if (rows.length > 0) reject({result: false, msg: 'That email is taken. Try another.', msg_kor: '이미 존재하는 이메일입니다. 다른 이메일로 시도해주세요.'})

        // email does not exist
        resolve()
      })
    })
  }
  const encryptPassword = () => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(64, (err, buf) => { //randomBtyes로 salt를 생성 -> buf로 바꿈
        crypto.pbkdf2(password, buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
          if (err) reject({msg: 'Encrypting password failed.',msg_kor: '비밀번호 암호화 실패'})
          password = key.toString('base64')
          password_salt = buf.toString('base64')
          resolve()
        })
      })
    })
  }
  const createLead = () => {
    return new Promise((resolve, reject) => {
      lead = {
        company: company,
        email: email,
        lead_source: 'Website',
        lead_status: 'Open - Not Contacted',
        lead_type: 'Supplier'
      }
      mysql.query(
        `INSERT INTO ${CONFIG_MYSQL.TABLE_LEADS} SET ?`, lead, (err, rows) => {
          if (err) reject({msg: 'Create lead failed.',msg_kor: '도메인 업데이트 실패'})
          last_lead_id = rows.insertId
          resolve()
        })
    })
  }
  const createAccount = () => {
    return new Promise((resolve, reject) => {
      account = {
        account_name: company,
        account_status: 'pending',
        account_type: 'Supplier',
        membership_type: 'Standard',
        customer_priority: '1'
      }
      mysql.query(`INSERT INTO ${CONFIG_MYSQL.TABLE_ACCOUNTS} SET ?`, account, (err, rows) => {
        if (err) reject({msg: 'Create account failed.',msg_kor: '도메인 업데이트 실패'})
        last_account_id = rows.insertId
        resolve()
      })
    })
  }
  const createContact = () => {
    return new Promise((resolve, reject) => {
      contact = {
        account_id: last_account_id,
        contact_email: email,
        password: password,
        password_salt: password_salt,
        lead_source: 'Website',
        contact_level: '1',
        management_level: '1'
      }
      mysql.query(
        `INSERT INTO ${CONFIG_MYSQL.TABLE_CONTACTS} SET ?`, contact, (err, rows) => {
          if (err) reject({msg: 'Create contact failed.',msg_kor: '도메인 업데이트 실패'})
          last_contact_id = rows.insertId
          resolve()
        })
    })
  }
  const convertLead = () => {
    return new Promise((resolve, reject) => {
      lead_update = {
        account_id: last_account_id,
        lead_status: 'Closed - Converted',
        converted_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }
      mysql.query(
        `UPDATE ${CONFIG_MYSQL.TABLE_LEADS} SET ? WHERE lead_id = ${last_lead_id}`, lead_update, (err) => {
          if (err) reject({msg: 'Convert lead failed.',msg_kor: '도메인 업데이트 실패'})
          resolve()
        })
    })
  }
  const updateDomain = () => {
    return new Promise((resolve, reject) => {
      account_update = {
        domain: `${handled_company}-${56789 + last_account_id}`
      }
      mysql.query(
        `UPDATE ${CONFIG_MYSQL.TABLE_ACCOUNTS} a SET ? WHERE account_id = ` + last_account_id, account_update, (err) => {
          if (err) reject({msg: 'Domain update failed.',msg_kor: '도메인 업데이트 실패'})
          resolve()
        })
    })
  }

  const onSuccess = () => {
    res.status(200).json({
      result: true,
      msg: 'Sign up success',
      msg_kor: '회원가입이 성공적으로 완료되었습니다.'
    })
  }

  const onError = (err) => {
    res.status(403).json({
      result: false,
      msg: err.msg,
      msg_kor: err.msg_kor
    })
  }

  try {
    await checkEmail(email)
    await encryptPassword(password)
    await createLead()
    await createAccount()
    await createContact()
    await convertLead()
    await updateDomain()
    onSuccess()
  } catch (err) {
    onError(err)
  }
}

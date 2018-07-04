const mysql = require('../../mysql')
const crypto = require('crypto')
const MYSQL_MODELS = require('../../mysql/model')
const { onError } = require('../../../utils/error')

// POST /api/auth/convert_buyer
module.exports = async (req, res) => {
  let { lead_id, company, email, password: raw_password } = req.body
  email = email.toLowerCase()

  const checkEmail = email => {
    return new Promise((resolve, reject) => {
      const ERR_QUERY = 'Malformed check email query.'
      const ERR_EXIST_EMAIL = 'The email is already taken.'
      const SQL = `
      SELECT
        contact_id
      FROM
        ${MYSQL_MODELS.TABLE_CONTACTS}
      WHERE
        lower(contact_email) = ? AND
        isDeleted != 1
      `

      mysql.query(SQL, [email], (err, rows) => {
        if (err) reject(onError(1001, ERR_QUERY, err))

        if (rows.length) reject(onError(1002, ERR_EXIST_EMAIL))

        resolve()
      })
    })
  }

  const encryptPassword = password => {
    return new Promise((resolve, reject) => {
      const ERR_PASSWORD = 'Failed to encrypt password.'
      crypto.randomBytes(64, (err, buf) => {
        //randomBtyes로 salt를 생성 -> buf로 바꿈
        crypto.pbkdf2(password, buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
          if (err) reject(onError(1003, ERR_PASSWORD, err))

          const payload = {
            password: key.toString('base64'),
            password_salt: buf.toString('base64')
          }

          resolve(payload)
        })
      })
    })
  }

  const createAccount = company => {
    return new Promise((resolve, reject) => {
      const ERR_QUERY = 'Malformed creating account query.'
      const SQL = `
      INSERT INTO
        ${MYSQL_MODELS.TABLE_ACCOUNTS}
      SET
        account_name = ?
      `
      mysql.query(SQL, company, (err, result) => {
        if (err) reject(onError(1004, ERR_QUERY, err))

        resolve(result.insertId)
      })
    })
  }

  const createContact = (account_id, email, password, salt) => {
    return new Promise((resolve, reject) => {
      const ERR_QUERY = 'Malformed creating contact query.'
      const SQL = `
      INSERT INTO
        ${MYSQL_MODELS.TABLE_CONTACTS}
      SET
        account_id = ?,
        contact_email = ?,
        password = ?,
        password_salt = ?
      `
      mysql.query(SQL, [account_id, email, password, salt], (err, result) => {
        if (err) reject(onError(1005, ERR_QUERY, err))

        resolve(result.insertId)
      })
    })
  }

  const convertLead = (account_id, lead_id) => {
    return new Promise((resolve, reject) => {
      const ERR_QUERY = 'Malformed convert lead query.'
      const SQL = `
      UPDATE
        ${MYSQL_MODELS.TABLE_LEADS}
      SET
        account_id = ${account_id},
        lead_status = "Closed - Converted",
        converted_date = (SELECT NOW())
      WHERE
        lead_id = ?
      `
      mysql.query(SQL, [lead_id], err => {
        if (err) reject(onError(1006, ERR_QUERY, err))

        resolve()
      })
    })
  }

  const convertBuyingLeads = (lead_id, account_id, contact_id) => {
    return new Promise((resolve, reject) => {
      const ERR_QUERY = 'Malformed update tables query.'
      const SQL = `
      UPDATE
        ${MYSQL_MODELS.TABLE_BUYING_LEADS} bl
      SET
        bl.account_id = ${account_id},
        bl.author_id = ${contact_id}
      WHERE
        bl.temp_author_id = ?
      `
      mysql.query(SQL, [lead_id], err => {
        if (err) reject(onError(1007, ERR_QUERY))

        resolve()
      })
    })
  }

  try {
    await checkEmail(email)
    const { password, password_salt } = await encryptPassword(raw_password)
    const account_id = await createAccount(company)
    const contact_id = await createContact(account_id, email, password, password_salt)
    await convertLead(account_id, lead_id)
    await convertBuyingLeads(lead_id, account_id, contact_id)
    res.status(200).json({ msg: 'Converting lead to account as a buyer successfully.' })
  } catch (err) {
    res.status(403).json(err)
  }
}

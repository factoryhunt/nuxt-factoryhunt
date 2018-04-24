const mysql = require('../mysql')
const CONFIG_MYSQL = require('../mysql/model')
const { publishToken } = require('../../utils/jwt')
const { noreplyMailer } = require('../../middleware/mailer')

// POST /api/auth/forgot_password
module.exports = async (req, res) => {
  let { email } = req.body
  email = email ? email.toLowerCase() : ''

  const getReceiverName = ({ salutation, first_name, last_name, contact_email }) => {
    if (salutation && first_name && last_name) return `${salutation} ${first_name} ${last_name}`

    if (salutation && first_name) return `${salutation} ${first_name}`

    if (salutation && last_name) return `${salutation} ${last_name}`

    return contact_email
  }

  const getPayload = ({ contact_id }) => {
    return {
      contact_id: contact_id
    }
  }

  const getTemplate = (name, token) =>
    `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"/><html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" style="margin: 0; padding: 0;"> <head> </head> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <meta name="x-apple-disable-message-reformatting"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> *{text-size-adjust: 100%; -ms-text-size-adjust: 100%; -moz-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;}html{height: 100%; width: 100%;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; mso-line-height-rule: exactly;}div[style*="margin: 16px 0"]{margin: 0 !important;}table, td{mso-table-lspace: 0pt; mso-table-rspace: 0pt;}img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}.ReadMsgBody, .ExternalClass{width: 100%;}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass td, .ExternalClass div{line-height: 100%;}</style><!--[if gte mso 9]> <style type="text/css"> li{text-indent: -1em;}table td{border-collapse: collapse;}</style><![endif]--> <title>Please Reset Your Password | Factory Hunt</title><!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--> </head> <body class="body" style="padding: 0; background-color: #FFFFFF; margin: 0; width: 100%;"> <table class="bodyTable" role="presentation" width="100%" align="left" border="0" cellpadding="0" cellspacing="0" style="padding: 0; width: 100%; background-color: #FFFFFF; margin: 0;" bgcolor="#FFFFFF"> <tr style="margin: 0; padding: 0;"> <td class="body__content" align="left" width="100%" valign="top" style="margin: 0; color: #000000; line-height: 20px; font-family: 'Roboto',sans-serif; font-size: 18px; font-weight: 400; padding: 12px; text-align: left; word-wrap: break-word;"> <div class="container" style="padding: 0; max-width: 600px; width: 100%; margin: 0;"><!--[if mso | IE]> <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0; margin-right: 0; margin-left: 0;width: 600px" width="600" align="left"> <tr style="margin: 0; padding: 0;"> <td style="margin: 0; padding: 0;"><![endif]--> <table class="container__table" role="presentation" border="0" align="left" cellpadding="0" cellspacing="0" width="100%" style="margin: 0; padding: 0;"> <tr class="container__row" style="margin: 0; padding: 0;"> <td class="container__cell" width="100%" align="left" valign="top" style="margin: 0; padding: 0;"> <div id="container" style="margin: 0; padding: 0; max-width: 486px;"> <p class="text p" style="display: block; color: #000000; line-height: 20px; padding: 0; font-family: 'Roboto',sans-serif; font-size: 18px; font-weight: 400; text-align: left; word-wrap: break-word; margin: 20px 0;">Hi ${name},</p><p class="text p" style="display: block; color: #000000; line-height: 20px; padding: 0; font-family: 'Roboto',sans-serif; font-size: 18px; font-weight: 400; text-align: left; word-wrap: break-word; margin: 20px 0;">We’ve received a request to reset your password.</p><p class="text p" style="display: block; color: #000000; line-height: 20px; padding: 0; font-family: 'Roboto',sans-serif; font-size: 18px; font-weight: 400; text-align: left; word-wrap: break-word; margin: 20px 0;">If you didn’t make the request, just ignore this message. Otherwise, you can reset your password using this link:</p><a id="link" href="https://www.factoryhunt.com/verification/reset?token=${token}" class="a" style="margin: 0; padding: 16px 28px; font-weight: 500; border-radius: 3px; background-color: #F2583D; color: #FFFFFF; display: inline-block; text-decoration: none;"><span class="a__text" style="margin: 0; padding: 0; color: #FFFFFF; text-decoration: none;">Click here to reset your password</span></a> <p class="text p" style="display: block; color: #000000; line-height: 20px; padding: 0; font-family: 'Roboto',sans-serif; font-size: 18px; font-weight: 400; text-align: left; word-wrap: break-word; margin: 20px 0;">Thanks,<br style="margin: 0; padding: 0;"/>The Factory Hunt Team</p></div></td></tr></table><!--[if mso | IE]> </td></tr></table><![endif]--> </div></td></tr></table> <div style="margin: 0; padding: 0; display: none; white-space: nowrap; font-size: 15px; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div></body></html>`

  const checkEmail = () => {
    return new Promise((resolve, reject) => {
      mysql.query(
        `
      SELECT 
      contact_id,
      salutation,
      first_name,
      last_name,
      contact_email
      FROM 
      ${CONFIG_MYSQL.TABLE_CONTACTS} 
      WHERE 
      lower(contact_email) = "${email}" AND
      isDeleted != 1
      `,
        (err, rows) => {
          // mysql error
          if (err) reject({ msg: 'Internal server error. Please try again later.' })

          // email does not exist
          if (!rows.length) reject({ msg: 'The email does not exist.' })

          // email exists
          resolve(rows[0])
        }
      )
    })
  }

  const postMail = template => {
    const config = {
      from: 'Factory Hunt <noreply@factoryhunt.com>',
      to: email,
      subject: 'Please reset your password',
      html: template
    }

    return new Promise((resolve, reject) => {
      noreplyMailer.sendMail(config, (err, info) => {
        if (err) reject(err)

        console.log(info)
        resolve()
      })
    })
  }

  try {
    const contact = await checkEmail()

    const receiver = getReceiverName(contact)
    const token = await publishToken(getPayload(contact), '1h')

    const template = getTemplate(receiver, token)
    await postMail(template)

    res.status(200).json({ msg: 'Reset password email is sent successfully.' })
  } catch (err) {
    console.log(err)
    res.status(403).json({ err: err, msg: err.msg })
  }
}

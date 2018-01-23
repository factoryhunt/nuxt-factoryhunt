const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const jwt_config = require('../../.config')
const config = require('../.config')

module.exports = async (req, res) => {
  const { email, subject, account_id } = req.body
  const {
    hostname,
    protocol
  } = req
  const transporter = nodemailer.createTransport(config.noreply)

  const createSender = () => {
    return new Promise((resolve, reject) => {
      nodemailer.createTestAccount((err, account) => {
        if (err) reject(err)
        resolve()
      })
    })
  }

  const createToken = () => {
    return new Promise((resolve, reject) => {
      const payload = {
        id: account_id
      }
      const options = {
        expiresIn: '1d', // expired in 24 hours
        issuer: 'factoryhunt.com',
        subject: 'user_id'
      }
      jwt.sign(payload, jwt_config.jwtSecret, options,
        (err, token) => {
          if (err) reject(err)
          resolve(token)
        })
    })
  }

  const sendEmail = (token) => {
    return new Promise((resolve, reject) => {
      const link = `https://${hostname}/api/auth/email_verify?id=${token}`
      const mailOptions = {
        from: 'noreply@factoryhunt.com', // sender address
        to: email, // list of receivers
        bcc: 'info@factoryhunt.com',
        subject: `[Factory Hunt] ${subject}`
      }
      mailOptions.html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"/><html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> </head> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <meta name="x-apple-disable-message-reformatting"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> *{text-size-adjust: 100%; -ms-text-size-adjust: 100%; -moz-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;}html{height: 100%; width: 100%;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; mso-line-height-rule: exactly;}div[style*="margin: 16px 0"]{margin: 0 !important;}table, td{mso-table-lspace: 0pt; mso-table-rspace: 0pt;}img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}.ReadMsgBody, .ExternalClass{width: 100%;}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass td, .ExternalClass div{line-height: 100%;}</style><!--[if gte mso 9]> <style type="text/css"> li{text-indent: -1em;}table td{border-collapse: collapse;}</style><![endif]--> <title></title><!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--> </head> <body class="body" style="background-color: #FFFFFF; margin: 0; width: 100%;"> <table class="bodyTable" role="presentation" width="100%" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #FFFFFF; margin: 0;" bgcolor="#FFFFFF"> <tr> <td class="body__content" align="left" width="100%" valign="top" style="font-size: 16px; line-height: 20px; color: #484848; font-family: 'Lato','Helvetica Neue',Helvetica,Arial,sans-serif;"> <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"><!--[if mso | IE]> <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center"> <tr> <td><![endif]--> <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%"> <tr class="container__row"> <td class="container__cell" width="100%" align="left" valign="top" style="background-color: #FFFFFF; padding: 0 24px;" bgcolor="#FFFFFF"> <div class="header-container"> <div class="row"> <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;"> <tr class="row__row"> <img id="logo" src="https://s3-us-west-1.amazonaws.com/factoryhunt.com/logo_big_background.png" large="12" border="0" alt="" class="img__block" style="display: block; max-width: 100%; width: 46px; margin-top: 24px; margin-bottom: 12px; height: 46px;" width="46" height="46"/> </tr></table> </div><div class="row"> <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;"> <tr class="row__row"> <p id="title" large="12" class="text p" style="display: block; color: #484848; font-family: 'Lato','Helvetica Neue',Helvetica,Arial,sans-serif; margin: 0; font-size: 30px; font-weight: 900; letter-spacing: -.75px; line-height: 36px; margin-bottom: 8px; text-align: left;">Confirm your email on Factory Hunt</p></tr></table> </div></div><div class="body-container"> <div class="row"> <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;"> <tr class="row__row"> <td class="column col-sm-12" width="600" style="width: 100%" align="left" valign="top"> <div class="text-container"> <p class="text p" style="display: block; font-size: 16px; color: #484848; font-family: 'Lato','Helvetica Neue',Helvetica,Arial,sans-serif; margin: 0; line-height: 24px;">Hello! We just need to verify that <span class="highlight" style="color: #000000 !important;text-decoration:none !important;font-weight: 900;">${email}</span> is your email address, and then we’ll help you activate your account.</p></div><div class="verify-button-container" style="margin: 55px 0; text-align: center;"> <a href="${link}" id="verify-button" class="a" style="text-decoration: none; padding: 13px 22px; font-weight: 500; font-size: 20px; border-radius: 3px; background-color: #F2583D; color: #FFFFFF;"><span class="a__text" style="text-decoration: none; color: #FFFFFF;">Confirm Email Address</span></a> </div><div> <p class="sub-title text p" style="display: block; font-size: 16px; color: #484848; font-family: 'Lato','Helvetica Neue',Helvetica,Arial,sans-serif; margin: 0; line-height: 24px; font-weight: 800;">Didn’t request this email?</p><p class="text p" style="display: block; font-size: 16px; color: #484848; font-family: 'Lato','Helvetica Neue',Helvetica,Arial,sans-serif; margin: 0; line-height: 24px;">No worries! Your address may have been entered by mistake. If you ignore or delete this email, nothing further will happen.</p></div></td></tr></table> </div></div></td></tr></table><!--[if mso | IE]> </td></tr></table><![endif]--> </div><div class="footer-container" style="margin-top: 60px;"> <p id="divider" class="text p" style="display: block; font-size: 16px; color: #484848; font-family: 'Lato','Helvetica Neue',Helvetica,Arial,sans-serif; margin: 0; line-height: 24px; width: 100%; height: 1px; background-color: #DBDBDB;"> </p><div class="footer-inner-container" style="padding: 50px 24px; text-align: center;"> <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"><!--[if mso | IE]> <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center"> <tr> <td><![endif]--> <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%"> <tr class="container__row"> <td class="container__cell" width="100%" align="left" valign="top" style="background-color: #FFFFFF; padding: 0 24px;" bgcolor="#FFFFFF"> <div class="row"> <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;"> <tr class="row__row"> <p id="footer-title" large="12" class="text p" style="display: block; font-size: 16px; color: #484848; font-family: 'Lato','Helvetica Neue',Helvetica,Arial,sans-serif; margin: 0; line-height: 24px; text-align: center;">Made by <a href="https://www.factoryhunt.com" target="_blank" class="a" style="color: #317FA9; text-decoration: none;"><span class="a__text" style="color: #317FA9; text-decoration: none;">factoryhunt.com</span></a></p></tr></table> </div><div class="row"> <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;"> <tr class="row__row"> <p large="12" class="text p" style="display: block; color: #484848; font-family: 'Lato','Helvetica Neue',Helvetica,Arial,sans-serif; margin: 0; line-height: 24px; text-align: center; font-size: 15px;">133 Bongeunsa-ro, Floor 8, Gangnam-gu, Seoul, South Korea</p></tr></table> </div><div class="row" style="margin-top: 24px;"> <table class="row__table" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;"> <tr class="row__row"> <p large="12" class="text p" style="display: block; font-size: 16px; color: #484848; font-family: 'Lato','Helvetica Neue',Helvetica,Arial,sans-serif; margin: 0; line-height: 24px; text-align: center;"><a href="https://www.factoryhunt.com/terms" target="_blank" class="a" style="color: #317FA9; text-decoration: none;"><span class="a__text" style="color: #317FA9; text-decoration: none;">Terms</span></a> • <a href="https://www.factoryhunt.com/privacy" target="_blank" class="a" style="color: #317FA9; text-decoration: none;"><span class="a__text" style="color: #317FA9; text-decoration: none;">Privacy</span></a> • <a href="https://facebook.com/factoryhunt" target="_blank" class="a" style="color: #317FA9; text-decoration: none;"><span class="a__text" style="color: #317FA9; text-decoration: none;">Facebook</span></a></p></tr></table> </div></td></tr></table><!--[if mso | IE]> </td></tr></table><![endif]--> </div></div></div></td></tr></table> <div style="display:none; white-space:nowrap; font-size:15px; line-height:0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div></body></html>`
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) reject(err)
        resolve(info)
      })
    })
  }

  const onSuccess = () => {
    res.status(200).json({
      result: true,
      msg: 'Sign up email sent success. We just sent verifying email to the email. Check the email.',
      msg_kor: '성공적으로 가입되었습니다. \n가입하신 이메일로 인증 메일을 보냈습니다. 메일을 열어 이메일을 인증해주세요.'
    })
  }

  try {
    await createSender()
    const token = await createToken()
    const info = await sendEmail(token)
    console.log(info)
    onSuccess()
  } catch (err) {
    res.status(403).json({result: true})
  }
}

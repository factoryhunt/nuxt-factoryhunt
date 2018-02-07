const nodemailer = require('nodemailer')
const config = require('../.config')

module.exports = async (req, res) => {
  const {
    email,
    company,
    product,
    pid:product_id,
    inquiry,
    subject
  } = req.body

  const transporter = nodemailer.createTransport(config.info)

  const mailOptions = {
    from: 'info@factoryhunt.com', // sender address
    to: 'info@factoryhunt.com', // list of receivers
    subject: `[Factory Hunt] ${subject}`,
    // text: 'Sender: ' + fromEmail, // plain text body
    html:
    '<h2>Email</h2>' +
    email +
    '<br><br>' +
    '<h2>Company</h2>' +
    company +
    '<br><br>' +
    '<h2>Product' + ' (' + product_id + ')' + '</h2>' +
    product +
    '<br><br>' +
    '<h2>Message</h2>' +
    inquiry
  }

  const createTestAccount = () => {
    return new Promise((resolve, reject) => {
      nodemailer.createTestAccount((err, account) => {
        if (err) reject(err)
        resolve(account)
      })
    })
  }

  const sendEmail = () => {
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) reject(err)
        resolve(info)
      })
    })
  }

  try {
    await createTestAccount()
    await sendEmail()
    res.status(200).json({result: true, msg:'Email has sent successfully.'})
  } catch (err) {
    res.status(403).json({result: false})
  }
}

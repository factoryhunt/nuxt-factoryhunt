const mailer = require('../../../middleware/mailer')

// POST /api/mail/ads
module.exports = async (req, res) => {
  const message = {
    from: 'info@factoryhunt.com',
    to: 'tmna1234@naver.com',
    subject: 'Message title',
    text: 'Plaintext version of the message',
    html: '<p>HTML version of the message</p>'
  }

  const sendMail = () => {
    return new Promise((resolve, reject) => {
      mailer.sendMail(message, (err, info) => {
        if (err) reject(err)
        resolve(info)
      })
    })
  }

  try {
    await sendMail()
    res.json({msg: 'Mail has been sent!'})
  } catch (err) {
    res.json({msg: 'Mail has not been sent..'})
  }
}

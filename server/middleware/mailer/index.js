const nodemailer = require('nodemailer')
const config = require('./.config')

const transporter = nodemailer.createTransport(config.noreply)
transporter.verify((err, result) => {
  if (err) return console.log(err)
  console.log('nodemailer is verified')
})


module.exports = transporter

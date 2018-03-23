const nodemailer = require('nodemailer')
const config = require('./.config')

const infoMailer = nodemailer.createTransport(config.info)
infoMailer.verify((err, result) => {
  if (err) return console.log(err)
  console.log('\ninfoMailer is verified\n')
})

const noreplayMailer = nodemailer.createTransport(config.noreply)
noreplayMailer.verify((err, result) => {
  if (err) return console.log(err)
  console.log('\nnoreplayMailer is verified\n')
})

module.exports = {
  infoMailer,
  noreplayMailer
}

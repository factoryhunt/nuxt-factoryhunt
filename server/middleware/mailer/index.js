const nodemailer = require('nodemailer')
const config = require('./.config')

const infoMailer = nodemailer.createTransport(config.info)
infoMailer.verify((err, result) => {
  if (err) return console.log(err)
  console.log('\ninfoMailer is verified\n')
})

const noreplyMailer = nodemailer.createTransport(config.noreply)
noreplyMailer.verify((err, result) => {
  if (err) return console.log(err)
  console.log('\nnoreplayMailer is verified\n')
})

const danielMailer = nodemailer.createTransport(config.daniel)
danielMailer.verify((err, result) => {
  if (err) return console.log(err)
  console.log('\ndanielMailer is verified\n')
})

module.exports = {
  infoMailer,
  noreplyMailer,
  danielMailer
}

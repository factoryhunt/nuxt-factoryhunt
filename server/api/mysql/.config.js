const host = 'fh-rds.cfwdgkhtxdcy.us-west-1.rds.amazonaws.com'
const user = 'zerobaseinc'
const password = 'Ycombinator2017'
const database = process.env.NODE_ENV ? 'fh' : 'fh-sandbox'
const port = '3306'

module.exports =  {
  host     : host,
  user     : user,
  password : password,
  database : database,
  port     : port,
  debug    : false
}

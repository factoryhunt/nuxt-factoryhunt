const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PORT,
  MYSQL_PASSWORD,
  NODE_ENV,
  MYSQL_DATABASE,
  MYSQL_DATABASE_SANDBOX
} = process.env

const host = MYSQL_HOST || '127.0.0.1'
const user = MYSQL_USER || 'root'
const password = MYSQL_PASSWORD || 'YOUR_PASSWORD'
const database = NODE_ENV ? MYSQL_DATABASE : MYSQL_DATABASE_SANDBOX
const port = MYSQL_PORT || '3306'

module.exports = {
  host: host,
  user: user,
  password: password,
  database: database,
  port: port,
  debug: false
}

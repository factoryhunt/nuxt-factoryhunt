const mysql = require('mysql')
const config = require('./.config')
const { errorLogger, infoLogger } = require('../../middleware/winston')

// parameters
const connection = mysql.createConnection(config)

// methods
connection.connect((err) => {
  if (err) return errorLogger.error('Error connecting database ... \n\n' + err)

  infoLogger.info(`\nDatabase "${connection.config.database}" is connected ... \n\n`)
})

module.exports = connection

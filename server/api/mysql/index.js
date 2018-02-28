const mysql = require('mysql')
const config = require('./.config')

// parameters
const connection = mysql.createConnection(config)

// methods
connection.connect((err) => {
  if (err) return console.log('Error connecting database ... \n\n' + err)

  console.log(`\nDatabase "${connection.config.database}" is connected ... \n\n`)
})

module.exports = connection

const winston = require('winston')
const fs = require('fs')
const logDir = './log'

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const tsFormat = () => (new Date()).toLocaleTimeString()

// Log levels
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
const infoLogger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'info'
    }),
    new (require('winston-daily-rotate-file'))({
      level: 'info',
      filename: `${logDir}/-info.log`,
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
    })
  ]
})

const errorLogger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'error'
    }),
    new (require('winston-daily-rotate-file'))({
      level: 'error',
      filename: `${logDir}/-error.log`,
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
    })
  ]
})

infoLogger.info('Logging for info started.')
errorLogger.error('Logging for error started.')

module.exports = {
  infoLogger,
  errorLogger
}

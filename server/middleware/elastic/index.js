const es = require('elasticsearch')
const { config, ping } = require('./.config')
const { errorLogger, infoLogger } = require('../winston')
const client = new es.Client(config)
const host = process.env.NODE_ENV ? 'AWS' : 'localhost'

// ping usually has a 3000ms timeout
client.ping(ping, (err) => {
  if (err) return errorLogger.error('\nelasticsearch cluster is down!\n')

  infoLogger.info(`\nConnected with "${host}" Elasticserach server.\n`)
})

module.exports = client


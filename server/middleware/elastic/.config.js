module.exports = {
  config: {
    host: process.env.ES_HOST || 'localhost:9200',
    log: 'trace'
  },
  ping: {
    requestTimeout: 30000
  }
}

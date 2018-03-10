const config = require('./.config')

module.exports = () => {
  const es = require('elasticsearch')
  const client = new es.Client(config)

  client.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 6000
  }, function (error) {
    if (error) {
      console.log(error)
      console.trace('\nelasticsearch cluster is down!\n\n')
    } else {
      console.log('\nConnected with aws elasticsearch server.\n\n')
    }
  })
}

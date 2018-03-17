module.exports = {
  config: {
    host: 'localhost:9200',
    // host: process.env.NODE_ENV ?
    //   'https://search-fhtest-doawfzkesoodvvd2tobgifdyje.us-west-1.es.amazonaws.com' :
    //   'localhost:9200',
    log: 'trace'
  },
  ping: {
    requestTimeout: 30000
  }
}

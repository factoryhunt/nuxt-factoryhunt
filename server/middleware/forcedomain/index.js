const forcedomain = require('forcedomain')
const options = {
  hostname: 'www.factoryhunt.com',
  port: 3000,
  protocol: 'https',
  excludeRule: /\.amazonaws.com$/ // localhost is excluded by default
}
module.exports = forcedomain(options)

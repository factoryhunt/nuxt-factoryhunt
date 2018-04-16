const forcedomain = require('forcedomain')
const options = {
  hostname: 'www.factoryhunt.com',
  protocol: 'https',
  excludeRule: /\.amazonaws.com$/ // localhost is excluded by default
}
module.exports = forcedomain(options)

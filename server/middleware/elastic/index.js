const es = require('elasticsearch')
const { config, ping } = require('./.config')
const client = new es.Client(config)
const host = process.env.NODE_ENV ? 'AWS' : 'localhost'

// ping usually has a 3000ms timeout
client.ping(ping, (err) => {
  if (err) return ('\nelasticsearch cluster is down!\n')

  console.log(`\nConnected with "${host}" Elasticserach server.\n`)
})

module.exports = client

// const createIndexing = () => {
//   return new Promise((resolve, reject) => {
//     client.indices.create({
//       index: 'blog'
//     }, function(err, resp, status) {
//       if (err) reject(err)
//       else {
//         console.log('Indexing succeed\n', resp)
//         console.log('Index status\n', status)
//         resolve()
//       }
//     })
//   })
// }
//
// const addDocumentsToIndexName = (index) => {
//   return new Promise((resolve, reject) => {
//     client.index({
//       index: index,
//       type: 'posts',
//       body: {
//         "PostName": "Integrating Elasticsearch Into Your Node.js Application",
//         "PostType": "Tutorial",
//         "PostBody": "This is the text of our tutorial about using Elasticsearch in your Node.js application.",
//       }
//     }, function(err, resp, status) {
//       if (err) reject(err)
//       console.log(`addDocumentsToIndexName resp\n${status}\n`, resp)
//       resolve()
//     })
//   })
// }
//
// const search = (keyword) => {
//   return new Promise((resolve, reject) => {
//     client.search({
//       index: 'es-leads',
//       type: 'doc',
//       body: {
//         query: {
//           match: {
//             "products": keyword
//           },
//           // wildcard: {
//           //   "PostBody": "????.js"
//           // }
//         }
//       }
//     }).then(function(resp) {
//       resolve(resp)
//     }, function(err) {
//       if (err) reject(err.message)
//     })
//   })
// }

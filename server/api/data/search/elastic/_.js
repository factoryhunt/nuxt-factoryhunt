const es = require('../../../../middleware/elastic')

// GET /api/data/search/elastic/:input/:page
// query /?fuzziness=INT
module.exports = async (req, res) => {
  const numberOfResults = 15
  let {
    input,
    page
  } = req.params
  let fuzziness = req.query.fuzziness || 1
  page = parseInt(page)
  page = page * numberOfResults
  console.log(fuzziness)

  const searchKeyword = () => {
    return new Promise((resolve, reject) => {
      es.search({
        body: {
          from: page,
          size: numberOfResults, // size는 쿼리 갯수만 제한시키고 aggs나 highlight엔 영향을 안준다.
          query: {
            bool: {
              filter: {
                terms: {
                  account_status: [
                    "open",
                    "approved"
                  ]
                }
              },
              must: [
                {
                  dis_max: {
                    tie_breaker: 0.7,
                    boost: 1.2,
                    queries: [{
                      multi_match: {
                        query: input,
                        fields: ["account_name", "products", "company_short_description"],
                        fuzziness: fuzziness
                      }
                    }]
                  }
                }
              ],
              should: [
                {
                  match: {
                    account_status: {
                      query: "approved",
                      boost: 1000
                    }
                  }
                }
              ]
            }
          },
          highlight: {
            fields: {
              products: {}
            }
          }
        }
      }).then(function(resp) {
        resolve(resp)
      }, function(err) {
        if (err) reject(err.message)
      })
    })
  }

  const analysis = () => {
    return new Promise((resolve, reject) => {
      es.indices.analyze({
        body: {
          tokenizer: 'standard',
          filter: [
            'lowercase',
            'unique'
          ],
          text: input
        }
      }).then(resp => {
        resolve(resp)
      }).catch(err => {
        reject(err)
      })
    })
  }

  try {
    const { hits } = await searchKeyword()
    const analysisResult = await analysis
    console.log(analysisResult)
    res.status(200).json(hits)
  } catch (err) {
    res.status(403).json({ result: [] })
  }
}
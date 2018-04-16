const es = require('../../../../middleware/elastic')
const categories = require('../../../../../app/assets/models/categories.json')

// GET /api/data/search/elastic/:input
// query ?page=INT&fuzziness=INT&country=STRING
module.exports = async (req, res) => {
  const numberOfResults = 15
  let {
    input
  } = req.params
  let page = parseInt(req.query.page, 10)
  let fuzziness = req.query.fuzziness || 0
  let country = req.query.country || ''
  page = page * numberOfResults

  // filter
  let filter = []
  // filter - country
  if (country) {
    const countryFilter = {
      match: {
        mailing_country: country
      }
    }
    filter.push(countryFilter)
  }
  // filter - account_status
  const statusFilter = {
    match: {
      account_status: {
        query: 'open approved',
        operator: 'or'
      }
    }
  }
  filter.push(statusFilter)

  const getParentCategories = (text = String) => {
    let result = {
      large_category: '',
      middle_category: ''
    }

    return new Promise((resolve) => {
      categories.forEach(category => {

        // find large category
        const isMatched = (category.name).toLowerCase() === text.toLowerCase()
        if (isMatched) result.large_category = category.name

        const sub_categories = category.sub_category
        sub_categories.forEach(element => {

          // find middle category
          const isMatched = (element.name).toLowerCase() === text.toLowerCase()
          if (isMatched) {
            result.large_category = category.name
            result.middle_category = element.name
            resolve(result)
          }

        })
      })

      resolve(result)
    })
  }

  const searchKeyword = () => {
    return new Promise((resolve, reject) => {
      es.search({
        body: {
          from: page,
          size: numberOfResults, // size는 쿼리 갯수만 제한시키고 aggs나 highlight엔 영향을 안준다.
          query: {
            bool: {
              filter: filter,
              must: [
                {
                  dis_max: {
                    tie_breaker: 0.7,
                    queries: [{
                      multi_match: {
                        query: input,
                        fields: ['account_name', 'products', 'company_description' ,'company_short_description', 'website'],
                        fuzziness: fuzziness
                      }
                    }]
                  }
                }
                // {
                //   bool: {
                //     should: [
                //       {
                //         bool: {
                //           must: [
                //             {
                //               match: {
                //                 products: {
                //                   query: input,
                //                   fuzziness: 1
                //                 }
                //               }
                //             }
                //           ]
                //         }
                //       }
                //     ]
                //   }
                // }
              ],
              should: [
                {
                  match: {
                    account_status: {
                      query: 'approved',
                      boost: 1000
                    }
                  }
                },
                {
                  match: {
                    account_name: {
                      query: input,
                      boost: 1.1
                    }
                  }
                },
                {
                  match: {
                    products: {
                      query: input,
                      boost: 5
                    }
                  }
                },
                {
                  match: {
                    mailing_country: {
                      query: 'korea',
                      boost: -200
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
    let { hits } = await searchKeyword()
    const category = await getParentCategories(input)
    hits.categories = category
    // const analysisResult = await analysis
    // console.log(analysisResult)
    res.status(200).json(hits)
  } catch (err) {
    res.status(403).json({ result: [] })
  }
}

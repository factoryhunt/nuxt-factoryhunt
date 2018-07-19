const R = require('ramda')

exports.getQueryBody = options => {
  // OPTIONS
  // input: String
  // page: Int
  // size: Int
  // fuziness: Int
  // country: String -> Filter Query
  // aggs: String(ES Column) -> Aggregation Query

  const { page, numberOfResults, fuzziness, input, country } = options

  // Filter Query
  // filter - account_status
  const filter = [
    {
      match: {
        account_status: {
          query: 'open approved',
          operator: 'or'
        }
      }
    },
    {
      match: {
        account_type: {
          query: 'Supplier'
        }
      }
    }
  ]
  // filter - country
  const countryFilter = {
    match_phrase: {
      mailing_country: country
    }
  }

  // must
  let must = [
    {
      dis_max: {
        tie_breaker: 0.7,
        queries: [
          {
            multi_match: {
              query: input,
              fields: ['account_name', 'products', 'company_description', 'website'],
              fuzziness: fuzziness
            }
          }
        ]
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
  ]

  if (options.input === '*') {
    must = [
      {
        match_all: {}
      }
    ]
  }

  // should
  const should = [
    {
      match_phrase: {
        products: {
          query: input,
          boost: 10
        }
      }
    },
    {
      match: {
        account_status: {
          query: 'approved',
          boost: 5000
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

  // Aggregations
  const aggs = {
    countries: {
      terms: { field: 'mailing_country.keyword' }
    }
  }

  // Highlight
  const highlight = {
    fields: {
      products: {}
    }
  }

  // ES Query Body
  const body = {
    body: {
      query: {
        bool: {
          filter: filter,
          must: must,
          should: should
        }
      }
    }
  }

  // filtered body
  let query = R.clone(body)
  query.body.from = page
  query.body.size = numberOfResults // size는 쿼리 갯수만 제한시키고 aggs나 highlight엔 영향을 안준다.
  query.body.highlight = highlight
  if (options.country) query.body.query.bool.filter.push(countryFilter)

  // unset-filtered body
  let aggsQuery = R.clone(body)
  aggsQuery.body.aggs = aggs

  return [query, aggsQuery]
}

exports.getSuggestQuery = options => {}

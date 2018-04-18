const es = require('../../../../middleware/elastic')
const categories = require('../../../../../app/assets/models/categories.json')
const { getQueryBody } = require('./query')

// GET /api/data/search/elastic/:input
// query ?page=INT&fuzziness=INT&country=STRING
module.exports = async (req, res) => {
  const numberOfResults = 15
  let {
    input
  } = req.params
  let page = parseInt(req.query.page, 10)
  let fuzziness = parseInt(req.query.fuzziness, 10) || 0
  let country = req.query.country || ''
  page = page * numberOfResults

  const options = {
    input: input,
    page: page,
    numberOfResults: numberOfResults,
    fuzziness: fuzziness,
    country: country
  }

  const bodies = getQueryBody(options)

  const getParentCategories = (text) => {
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

  const getSearchResult = () => {
    return new Promise((resolve, reject) => {
      es.search(bodies[0])
        .then(function(resp) {
          resolve(resp)
        }, 
        function(err) {
          if (err) reject(err.message)
        })
    })
  }

  const getAggregations = () => {
    return new Promise((resolve, reject) => {
      es.search(bodies[1])
        .then(function (resp) {
          resolve(resp)
        },
          function (err) {
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
    console.log(req.body)
    console.log(req.params)
    console.log(req.query)
    let result = await getSearchResult()
    const aggs = await getAggregations()
    const category = await getParentCategories(input)
    console.log(category)
  
    result.aggregations = aggs.aggregations
    result.categories = category
    console.log(result)
    // const analysisResult = await analysis
    // console.log(analysisResult)
    res.status(200).json(result)
  } catch (err) {
    res.status(403).json({ result: [] })
  }
}

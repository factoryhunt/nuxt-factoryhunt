const es = require('../../../../middleware/elastic')

// POST /api/data/search/elastic/suggestion
module.exports = async (req, res) => {
  const { input } = req.body

  const getSuggestion = (input) => {
    return new Promise((resolve, reject) => {
      es.search({
        body: {
          suggest: {
            "suggestions": {
              prefix: input,
              completion: {
                field: "suggest",
                size: 7,
                skip_duplicates: true
              }
            }
          }
        }
      })
      .then(res => {
        resolve(res)
      }, (err) => {
        reject(err.message)
      })
    })
  }

  try {
    const { suggest } = await getSuggestion(input)
    res.status(200).json(suggest.suggestions[0])
  } catch (err) {
    console.log(err)
    res.status(403).json({ result: [] })
  }
}

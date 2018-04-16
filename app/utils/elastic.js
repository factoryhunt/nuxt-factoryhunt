// options
// q: String
// page: Int
// category: Boolean
// country: String
export const getSearchQuery = (options = Object) => {
  if (!options.q) return ''
  const q = options.q || ''
  const page = options.page ? `page=${options.page}` : `page=0` 
  const category = options.category ? '&category=1' : ''
  const country = options.country ? `&country=${options.country}` : ''
  const uri = `/api/data/search/elastic/${q}?${page}${category}${country}`

  return uri
}

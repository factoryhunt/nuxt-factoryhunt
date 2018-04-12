import categories from '~/assets/models/categories.json'

export const getParentCategories = (input = String) => {
  return new Promise((resolve) => {  
    categories.forEach(category => {

      const sub_categories = category.sub_category

      sub_categories.forEach(element => {
        const isMatched = (element.name).toLowerCase() === input.toLowerCase()
        const result = {
          large_category: category.name,
          middle_category: element.name
        }
        if (isMatched) resolve(result)
      })
    })
    resolve({
      large_category: '',
      middle_category: ''
    })
  })
}

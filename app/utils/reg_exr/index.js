export const get_pattern_max_length = {
  BUSINESS_TYPE: 3,
  INDUSTRIES: 5,
  PRODUCTS: 200,
  DOMAIN: 50,
  WEBSITE: 100,
  SHORT_DESCRIPTION: 150,
  LONG_DESCRIPTION: 25000,
  VIDEO: 150,
  TEL: 21,
  STATE: 50,
  CITY: 50,
  STREET: 100,
  POSTAL: 10,
  NAME: 20,
  ROLE: 30
}

export const get_pattern_config = {
  BUSINESS_TYPE: {
    id: 'business_type',
    value: 3
  },
  INDUSTRIES: 5,
  PRODUCTS: 200,
  DOMAIN: 50,
  WEBSITE: 100,
  SHORT_DESCRIPTION: 150,
  LONG_DESCRIPTION: 25000,
  VIDEO: 150,
  TEL: 21,
  STATE: 50,
  CITY: 50,
  STREET: 100,
  POSTAL: 10,
  NAME: 20,
  ROLE: 30
}

export const get_pattern = (type, max_length, min_length = 1) => {
  let regExr = ''
  let maxLength = 0

  switch (type) {
    case 'products':
      regExr = "A-Za-z0-9 ',()-"
      maxLength = get_pattern_max_length.PRODUCTS
      break
    case 'domain':
      regExr = 'a-z0-9.'
      maxLength = get_pattern_max_length.DOMAIN
      break
    case 'website':
      regExr = 'A-Za-z0-9 ./-'
      maxLength = get_pattern_max_length.WEBSITE
      break
    case 'short_description':
      regExr = "A-Za-z0-9 .,'-"
      maxLength = get_pattern_max_length.SHORT_DESCRIPTION
      break
    case 'long_description':
      regExr = "A-Za-z0-9 .,'-"
      maxLength = get_pattern_max_length.LONG_DESCRIPTION
      break
    case 'video':
      regExr = "A-Za-z0-9 .,'/?&=_:-"
      maxLength = get_pattern_max_length.VIDEO
      break
    case 'tel':
      regExr = '0-9 +-'
      maxLength = get_pattern_max_length.TEL
      break
    case 'state':
      regExr = 'A-Za-z -'
      maxLength = get_pattern_max_length.STATE
      break
    case 'city':
      regExr = 'A-Za-z -'
      maxLength = get_pattern_max_length.CITY
      break
    case 'address':
      regExr = 'A-Za-z0-9 -.,#()/'
      maxLength = get_pattern_max_length.STREET
      break
    case 'postal':
      regExr = '0-9-'
      maxLength = get_pattern_max_length.POSTAL
      break
    case 'name':
      regExr = 'A-Za-z .-'
      maxLength = get_pattern_max_length.POSTAL
      break
    case 'role':
      regExr = 'A-Za-z ,'
      maxLength = get_pattern_max_length.POSTAL
      break
  }

  if (max_length) maxLength = max_length
  regExr = `[${regExr}]{${min_length},${max_length}}`

  return regExr
}

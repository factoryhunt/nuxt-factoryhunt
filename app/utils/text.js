exports.convertEnterToBrTag = message => {
  return message.replace(/\n/g, '<br />')
}

exports.addComma = number => {
  number = String(number)
  return number.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
}

exports.nFormatter = (num, digits) => {
  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' }
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  let i
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol
}

exports.getRemainInputLength = (string, maxLength) => {
  const length = string.length
  const gap = maxLength - length > 0 ? maxLength - length : 0
  const result = gap.toLocaleString('en', { useGrouping: true })

  return result
}

exports.checkWebsiteLinkHasHttp = url => {
  if (url) {
    if (url.indexOf('http') === -1) {
      url = ('http://' + url).toLowerCase()
      return url
    }
  }
}

exports.removeTextSpace = text => {
  return text.replace(/(^\s*)|(\s*$)/, '').replace(/\s+/g, ' ')
}

exports.removeNullInArray = array => {
  let tempArray = []
  for (let i = 0; i < array.length; i++) {
    if (array[i]) {
      tempArray.push(array[i])
    }
  }
  return tempArray
}

exports.arrayToString = array => {
  let string = ''
  let tempArray = this.removeNullInArray(array)
  for (const i in tempArray) {
    const word = tempArray[i]

    if (i === '0') {
      string = word
    } else {
      string = string + `, ${word}`
    }
  }
  return string
}

// options
// lowercase: Boolean
exports.getFirstWord = (sentence = String, options = Object) => {
  if (!sentence) return ''

  let firstWord = sentence.replace(/(^\s*)|(\s*$)/, '')
  firstWord = sentence.split(' ')[0]

  if (options.lowercase) firstWord = firstWord.toLowerCase()

  return firstWord
}

exports.validateURL = url => {
  if (url) {
    if (url.indexOf('http') === -1) {
      url = `http://${url}?ref=factoryhunt.com`
      return url
    }
    return url
  }

  return ''
}

exports.getFullAddress = ({
  country = '',
  state = '',
  city = '',
  street_address = '',
  street_address_2 = ''
}) => {
  if (country && (state || city || street_address || street_address_2)) {
    country = `${country}, `
  }

  if (state && (city || street_address || street_address_2)) {
    state = `${state}, `
  }

  if (city && (street_address || street_address_2)) {
    city = `${city}, `
  }

  if (street_address && street_address_2) {
    street_address = `${street_address} `
  }

  return country + state + city + street_address + street_address_2
}

exports.encryptCompanyName = string => {
  const firstLetter = string.charAt(0)
  const starlize = string.slice(1).replace(/[^(\s)]/gi, '*')
  const result = `${firstLetter}${starlize}`

  return result
}

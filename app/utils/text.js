exports.convertEnterToBrTag = message => {
  return message.replace(/\n/g, '<br />')
}

exports.addComma = number => {
  number = String(number)
  return number.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
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
      url = `http://${url}?ref=factoryhunt`
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

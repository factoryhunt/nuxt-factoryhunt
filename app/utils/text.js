exports.convertEnterToBrTag = (message) => {
  return message.replace(/\n/g, '<br />')
}

exports.addComma = (number) => {
  number = String(number)
  return number.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
}

exports.checkWebsiteLinkHasHttp = (url) => {
  if (url) {
    if (url.indexOf('http') === -1) {
      url = ('http://' + url).toLowerCase()
      return url
    }
  }
}

exports.removeNullInArray = (array) => {
  let tempArray = []
  for (let i = 0; i < array.length; i++) {
    if (array[i]) {
      tempArray.push(array[i])
    }
  }
  return tempArray
}

exports.checkboxStringToArray = (originalArray, string) => {
  let temp = []
  for (const i in originalArray) {
    const value = originalArray[i].value
    if (string.includes(value)) {
      temp.push(value)
    }
  }
  return temp
}

exports.checkboxArrayToString = (originalArray, array) => {
  let string = '';
  let removedEmptyArray = this.removeNullInArray(array)

  for (const originalIndex in originalArray) {
    const rawValue = originalArray[originalIndex].value

    for (const index in removedEmptyArray) {
      if (rawValue === removedEmptyArray[index]) {

        string = string + `, ${rawValue}`
      }
    }
  }
  return string.substring(2)
}

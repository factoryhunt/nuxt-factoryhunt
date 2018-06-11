exports.removeNullInArray = array => {
  let tempArray = []
  for (let i = 0; i < array.length; i++) {
    if (array[i]) {
      tempArray.push(array[i])
    }
  }
  return tempArray
}

exports.limitCheckboxMaxLength = (elementClassName, array, maxLength) => {
  const $inputs = $(elementClassName)

  if (array.length > maxLength - 1) {
    $inputs.attr('disabled', 'disabled')
  } else {
    $inputs.removeAttr('disabled')
  }

  const $checkedInput = $(`${elementClassName}:checked`)
  $checkedInput.removeAttr('disabled')
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
  let string = ''
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

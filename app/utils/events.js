export const delayKeyupEvent = (event, delay = 1000) => {
  let delayTimer = 0
  clearTimeout(delayTimer)
  delayTimer = setTimeout(event, delay) // Will do the ajax stuff after 1000 ms, or 1 s
}

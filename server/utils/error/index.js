exports.onError = (code, msg, err) => ({
  code: code || 0,
  msg: msg || '',
  err: err || ''
})

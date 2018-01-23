module.exports = (req, res) => {
  req.logout()
  res.send('logout success')
}

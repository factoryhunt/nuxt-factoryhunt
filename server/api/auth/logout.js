module.exports = (req, res) => {
  delete req.session.auth
  res.send({result: true, msg: 'Logout succeed.'})
}

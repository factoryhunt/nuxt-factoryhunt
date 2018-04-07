module.exports = (req, res) => {
  let HOST = process.env.HOST

  const ipv4 = /(\d{2,3}).(\d{2,3}).(\d{2,3}).(\d{2,3})/
  const localhost = /localhost:\d{2,5}/
  const ec2 =  /amazonaws.com$/

  res.redirect('https://' + req.get('host') + req.url)
}

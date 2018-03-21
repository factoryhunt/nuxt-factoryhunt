module.exports = (server) => {
  const io = require('socket.io').listen(server)
  io.on('connection', (socket) => {
    console.log('1')
  })
}

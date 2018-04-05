(function() {
  let childProcess = require("child_process")
  let oldSpawn = childProcess.spawn
  function mySpawn() {
    console.log('spawn called')
    console.log(arguments)
    let result = oldSpawn.apply(this, arguments)
    return result
  }
  childProcess.spawn = mySpawn
})()

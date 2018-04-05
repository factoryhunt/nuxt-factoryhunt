const memwatch = require('memwatch-next')

// Take first snapshot
const hd = new memwatch.HeapDiff()

// do some things ...

// Take the second snapshot and compute the diff
const diff = hd.end()
console.log('\nMemwatch Heap Diff',diff)

memwatch.on('leak', function (info) {
  console.log('\nNode.js memory leak detected.')
  console.log(info)
})

memwatch.on('stats', function(stats) {
  // console.log('\nNode.js heap usage detected.')
  // console.log(stats)
})

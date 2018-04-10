const router = require('express').Router()

const multer = require('./multer-s3')
const create = require('./create')
const read = require('./read')
const update = require('./update')
const remove = require('./remove')

const fields = [
  {name: 'certification'}
]

router.post('/:account_id', multer.fields(fields), create)
router.get('/:account_id', read)
router.put('/', update)
router.delete('/:document_id', remove)

module.exports = router

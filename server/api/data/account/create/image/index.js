const router = require('express').Router()

const _account_id = require('./_account_id')

// Middlewares
const multer = require('../../../../middleware/multer')

const fields = [
  { name: 'company_logo_1' },
  { name: 'company_cover_image_1' },
  { name: 'company_cover_image_2' },
  { name: 'company_cover_image_3' },
  { name: 'company_cover_image_4' },
  { name: 'company_cover_image_5' },
  { name: 'company_cover_image_6' },
  { name: 'company_cover_image_7' },
  { name: 'company_cover_image_8' }
]

router.post('/image/:account_id', multer.fields(fields), _account_id)

module.exports = router

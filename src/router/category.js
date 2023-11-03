const express = require('express')
const {cekCategory, getId} = require('../controller/category')

const router = express.Router()
router.get('/', cekCategory)
router.get('/:id', getId)

module.exports = router
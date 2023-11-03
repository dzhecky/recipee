const express = require('express')
const {getUsers, inputUser, dropUser, putUser, getUserId} = require('../controller/user')

const router = express.Router()

router.post('/', inputUser)
router.get('/', getUsers)
router.get('/:id', getUserId)
router.delete('/:id', dropUser)
router.put('/:id', putUser)

module.exports = router
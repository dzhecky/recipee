const express = require('express')
const {getUsers, register, login, dropUser, putUser, getUserId} = require('../controller/user')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/', getUsers)
router.get('/:id', getUserId)
router.delete('/:id', dropUser)
router.put('/:id', putUser)

module.exports = router
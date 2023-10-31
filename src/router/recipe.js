const express = require('express')
const {getRecipes, inputRecipes, getById, updateRecipe, deleteRecepeId} = require('../controller/recipe')

const router = express.Router()

router.get('/', getRecipes)
router.get('/:id', getById)
router.put('/:id', updateRecipe)
router.post('/', inputRecipes)
router.delete('/:id', deleteRecepeId)

module.exports = router


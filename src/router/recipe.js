const express = require('express')
const {getRecipes, inputRecipes, getById, updateRecipe, deleteRecepeId, getRecipesDetail} = require('../controller/recipe')

const router = express.Router()

router.get('/', getRecipes)
router.get('/detail', getRecipesDetail)
router.get('/:id', getById)
router.put('/:id', updateRecipe)
router.post('/', inputRecipes)
router.delete('/:id', deleteRecepeId)

module.exports = router


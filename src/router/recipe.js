const express = require('express')
const {getRecipes, inputRecipes, getById, updateRecipe, deleteRecepeId, getRecipesDetail, getRecipesUser, getRecipesOtherById} = require('../controller/recipe')
const {protect} = require('../middleware/private')
const router = express.Router()

router.get('/', protect, getRecipes)
router.get('/myRecipe', protect, getRecipesUser)
router.get('/user/:id', protect, getRecipesOtherById)
router.get('/detail', getRecipesDetail)
router.get('/:id', getById)
router.put('/:id', protect, updateRecipe)
router.post('/', protect, inputRecipes)
router.delete('/:id', protect, deleteRecepeId)

module.exports = router


const express = require('express')
const {getRecipes, inputRecipes, getById, updateRecipe, deleteRecepeId, getRecipesDetail, getRecipesUser, getRecipesOtherById, getByCategory} = require('../controller/recipe')
const {protect} = require('../middleware/private')
const upload = require('../middleware/upload')
const router = express.Router()

router.get('/', getRecipes)
router.get('/category', getByCategory)
router.get('/myRecipe', protect, getRecipesUser)
router.get('/user/:id', protect, getRecipesOtherById)
router.get('/detail', getRecipesDetail)
router.get('/:id', getById)
router.put('/:id', protect, upload.single('photo'), updateRecipe)
router.post('/', protect, upload.single('photo'), inputRecipes)
router.delete('/:id', protect, deleteRecepeId)

module.exports = router


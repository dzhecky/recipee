const {getAllRecipes, inputRecipe, getRecipeById, putRecipe, deleteRecipe} = require('../model/recipe')
const {getCategory} = require('../model/category')

const recipeController =  {
    getRecipes : async (req, res, next)=> {
        let recipes = await getAllRecipes()
        let data = recipes.rows
        if(!data){
            return res.status(404).json({message: 'failed to get data from recipe'})
        }

        data.forEach((item, index)=>{
            let ingredients = item.ingredients.split(',')
            data[index].ingredients = ingredients

        })

        res.status(200).json({message : 'succes get data from recipe', data})
    },
    getById : async (req, res, next)=> {
        let id = req.params.id
        let recipes = await getRecipeById(id)
        let data = recipes.rows[0]
        if(!data){
            return res.status(404).json({message: 'failed to get data by id from recipe'})
        }
        res.status(200).json({message : 'succes get data by id from recipe', data})
    },
    inputRecipes : async (req, res, next)=> {
        let {id, title, ingredients, photo, category_id, food_writer} = req.body
        if(!id || !title || !ingredients || !photo || !category_id || !food_writer){
            return res.status(404).json({message: 'failed input data, all is required'})
        }

        let category = await getCategory()
        let isCategory = false
        category.rows.forEach((item)=>{
            if(item.id == category_id){
                isCategory = true
            }
        })

        if(!isCategory){
            return res.status(404).json({message: 'invalid there is no data'})
        }

        let data = {id, title, ingredients, photo, category_id: parseInt(category_id), food_writer: parseInt(food_writer)}
        let result = await inputRecipe(data)
        if(!result){
            return res.status(404).json({message: 'failed input data to recipe'})
        }
        res.status(200).json({message : 'succes input data to recipe', data})
    },
    updateRecipe : async (req, res, next) =>{
        let id = req.params.id
        let {title, ingredients, photo, category_id} = req.body

        let recipesData = await getRecipeById(id)
        if(recipesData.rowCount == 0){
            return res.status(404).json({message: 'failed , data not found!'})
        }

        let category = await getCategory()
        let isCategory = false
        category.rows.forEach((item)=>{
            if(item.id == category_id){
                isCategory = true
            }
        })

        if(!isCategory){
            return res.status(404).json({message: 'invalid there is no data'})
        }

        let data = recipesData.rows[0]
        let newData = {
            id : data.id,
            title : title || data.title,
            ingredients : ingredients || data.ingredients,
            photo : photo || data.photo,
            category_id : parseInt(category_id) || data.category_id
        }

        let result = await putRecipe(newData)
        console.log(result);

        if(!result){
            return res.status(404).json({message: 'failed update data'})
        }

        res.status(200).json({message : 'succes update data'})
    },
    deleteRecepeId : async (req, res, next)=> {
        let id = req.params.id
        let recipes = await deleteRecipe(id)
        if(recipes.rowCount == 0){
            return res.status(404).json({message: 'failed to delete recipe'})
        }
        res.status(200).json({message : 'succes delete recipe'})
    }

}

module.exports = recipeController
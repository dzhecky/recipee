const {getAllRecipes, inputRecipe, getRecipeById, putRecipe, deleteRecipe} = require('../model/recipe')

const recipeController =  {
    getRecipes : async (req, res, next)=> {
        let recipes = await getAllRecipes()
        let data = recipes.rows
        if(!data){
            return res.status(404).json({message: 'failed to get data at recipe'})
        }
        res.status(200).json({message : 'succes get data from recipe', data})
    },
    getById : async (req, res, next)=> {
        let id = req.params.id
        let recipes = await getRecipeById(id)
        let data = recipes.rows[0]
        if(!data){
            return res.status(404).json({message: 'failed to get data at recipe'})
        }
        res.status(200).json({message : 'succes get data from recipe', data})
    },
    inputRecipes : async (req, res, next)=> {
        let {title, content} = req.body
        console.log('title', title, '-content>', content);
        if(!title || !content){
            return res.status(404).json({message: 'failed input data, title and content required'})
        }

        let data = {title, content}
        let result = await inputRecipe(data)
        if(!result){
            return res.status(404).json({message: 'failed to input data at recipe'})
        }
        res.status(200).json({message : 'succes input data to recipe', data})
    },
    updateRecipe : async (req, res, next) =>{
        let id = req.params.id
        let {title, content} = req.body
        console.log('id', id, 'title', title, '-content>', content);

        let recipesData = await getRecipeById(id)
        if(recipesData.rowCount == 0){
            return res.status(404).json({message: 'failed , data not found!'})
        }

        let data = recipesData.rows[0]
        let newData = {
            id : data.id,
            title : title || data.title,
            content : content || data.content
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
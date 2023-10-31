const {getAllRecipes} = require('../model/recipe')

const recipeController =  {
    getRecipes : async (req, res, next)=> {
        let recipes = await getAllRecipes()
        let data = recipes.rows
        if(!data){
            res.status(404).json({message: 'failed to get data at recipe'})
        }
        res.status(200).json({message : 'succes get data from recipe', data})
    }
}

module.exports = recipeController
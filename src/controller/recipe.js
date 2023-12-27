const {getAllRecipes, getRecipesSpec, inputRecipe, getRecipeById, putRecipe, deleteRecipe, getRecipesCount, getRecipesByUserId} = require('../model/recipe')
const {getCategory} = require('../model/category')
const cloudinary = require('../config/photo')

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
    getRecipesUser : async (req, res, next)=> {
        let {uuid} = req.payload
        let recipes = await getRecipesByUserId(uuid)
        let data = recipes.rows
        if(!data){
            return res.status(404).json({message: 'failed to get data from recipe'})
        }

        data.forEach((item, index)=>{
            let ingredients = item.ingredients.split(',')
            data[index].ingredients = ingredients

        })

        res.status(200).json({message : `succes get recipes form users : ${req.payload.username}`, data})
    },
    getRecipesOtherById : async (req, res, next)=> {
        let {id} = req.params
        let recipes = await getRecipesByUserId(id)
        let data = recipes.rows
        if(!data){
            return res.status(404).json({message: 'failed to get data from recipe'})
        }

        data.forEach((item, index)=>{
            let ingredients = item.ingredients.split(',')
            data[index].ingredients = ingredients

        })

        res.status(200).json({message : `succes get recipes form users : ${req.payload.username}`, data})
    },
    getRecipesDetail : async (req, res, next)=> {

        let {search, searchBy, limit, sortBy} = req.query
        searchBy = searchBy || 'title'

        let limiter = limit || 5
        let pages = req.query.pages || 1
        let asc = sortBy || 'ASC'

        let data = {
            searchBy,
            search : search || '',
            offset : (pages - 1) * limiter,
            limit : limit || 3,
            asc
        }

        let recipes = await getRecipesSpec(data)
        let {rows} = await getRecipesCount(data)
        let count = parseInt(rows[0].count)
        let pagination = {
            totalPage : Math.ceil(count/limiter),
            totalData : count,
            pageNow : parseInt(pages)
        }
        let result = recipes.rows
        if(!result){
            return res.status(404).json({message: 'failed to get data from recipe'})
        }

        result.forEach((item, index)=>{
            let ingredients = item.ingredients.split(',')
            result[index].ingredients = ingredients

        })

        res.status(200).json({message : 'succes get data from recipe', data: result, pagination})
    },
    getById : async (req, res, next)=> {
        let id = req.params.id
        let recipes = await getRecipeById(id)
        let data = recipes.rows[0]
        data.ingredients = data.ingredients.split(',')
        if(!data){
            return res.status(404).json({message: 'failed to get data by id from recipe'})
        }
        res.status(200).json({message : 'succes get data by id from recipe', data})
    },
    inputRecipes : async (req, res, next)=> {
        let {title, ingredients, category_id} = req.body
        let {uuid} = req.payload

        if(!req.file){
            return res.status(404).json({message: 'photo must be jpg, png, jpeg or jfif'})
        }
        if(!req.isFileValid){
            return res.status(404).json({message: isFileValidMessage})
        }

        const imageUpload = await cloudinary.uploader.upload(req.file.path,{folder: 'recipe'})
        if(!imageUpload){
            return res.status(404).json({message: 'failed to upload photo'})
        }

        if(!title || !ingredients || !category_id){
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

        let data = {title, ingredients, photo:imageUpload.secure_url, category_id: parseInt(category_id),uuid}
        let result = await inputRecipe(data)
        if(!result){
            return res.status(404).json({message: 'failed input data to recipe'})
        }
        res.status(200).json({message : 'succes input data to recipe', data})
    },
    updateRecipe : async (req, res, next) =>{
        let id = req.params.id
        let {uuid} = req.payload
        let {title, ingredients, category_id} = req.body

        let recipesData = await getRecipeById(id)
        if(recipesData.rows[0].users_id !== uuid){
            return res.status(404).json({message: 'failed , data cannot update by this user!'})
        }
        if(recipesData.rowCount == 0){ 
            return res.status(404).json({message: 'failed , data not found!'})
        }

        let data = recipesData.rows[0]

        if(!category_id){
            category_id = data.category_id
        }else if(isNaN(parseInt(category_id))){
            return res.status(404).json({message: 'category invalid'})
        }else{
            let category = await getCategory()
            let isCategory = false
            category.rows.forEach((item)=>{
                if(item.id == category_id){
                    isCategory = true
                }
            })
            if(!isCategory){
                return res.status(404).json({message: 'category not found'})
            }
        }

        let newData = {
            id : data.id,
            title : title || data.title,
            ingredients : ingredients || data.ingredients,
            category_id : parseInt(category_id) || data.category_id,
        };

        if(!req.file){
            newData.photo =  data.photo
            let result = await putRecipe(newData)
            console.log(result);
    
            if(!result){
                return res.status(404).json({message: 'failed update data'})
            }
    
            return res.status(200).json({message : 'succes update data without photo'})
        }
        
        if(req.file){
            if(!req.isFileValid){
                return res.status(404).json({message: 'photo must be jpg, png, jpeg or jfif'})
            }
            const imageUpload = await cloudinary.uploader.upload(req.file.path,{folder: 'recipe'})
            if(!imageUpload){
                return res.status(404).json({message: 'failed to upload photo'})
            }
            newData.photo = imageUpload.secure_url;
            let result = await putRecipe(newData)
            console.log(result);
    
            if(!result){
                return res.status(404).json({message: 'failed update data'})
            }
    
            res.status(200).json({message : 'succes update data with photo'})
        }

    },
    deleteRecepeId : async (req, res, next)=> {
        let {uuid} = req.payload
        let id = req.params.id
        let recipesData = await getRecipeById(id)
        if(recipesData.rows[0].users_id !== uuid){
            return res.status(404).json({message: 'failed , data cannot update by this user!'})
        }
        let recipes = await deleteRecipe(id)
        if(recipes.rowCount == 0){
            return res.status(404).json({message: 'failed to delete recipe'})
        }
        res.status(200).json({message : 'succes delete recipe'})
    }

}

module.exports = recipeController
const Pool = require('../config/db')

const getAllRecipes = async () => {
    return new Promise((resolve, reject)=>{
        Pool.query(`SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM recipes JOIN category ON recipes.category_id=category.id
         ORDER BY category_id DESC;`, (err, result)=>{
            if(!err){
                return resolve(result)
            }else {
                reject(err)
            }
        })
    })
}
const getRecipesSpec = async (data) => {
    let {search, searchBy, offset, limit, asc} = data
    return new Promise((resolve, reject)=>{
        Pool.query(`SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM recipes JOIN category ON recipes.category_id=category.id
         WHERE recipes.${searchBy} ILIKE '%${search}%'
        ORDER BY ID ${asc} OFFSET ${offset} LIMIT ${limit};`, (err, result)=>{
            if(!err){
                return resolve(result)
            }else {
                reject(err)
            }
        })
    })
}

const getRecipesCount = async (data) => {
    let {search, searchBy} = data
    return new Promise((resolve, reject)=>{
        Pool.query(`SELECT COUNT(*) FROM recipes JOIN category ON recipes.category_id=category.id 
        WHERE recipes.${searchBy} ILIKE '%${search}%';`, (err, result)=>{
            if(!err){
                return resolve(result)
            }else {
                reject(err)
            }
        })
    })
}

const getRecipeById = async (id) => {
    return new Promise((resolve, reject)=>{
        Pool.query(`SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM recipes JOIN category ON recipes.category_id=category.id 
        WHERE recipes.id='${id}';`, (err, result)=>{
            if(!err){
                return resolve(result)
            }else {
                reject(err)
            }
        })
    })
}

const deleteRecipe = async (id) => {
    return new Promise((resolve, reject)=>{
        Pool.query(`DELETE FROM recipes WHERE id='${id}';`, (err, result)=>{
            if(!err){
                return resolve(result)
            }else {
                reject(err)
            }
        })
    })
}

const inputRecipe = async (data) =>{
    let {id, title, ingredients, photo, category_id, food_writer} = data

    return new Promise((resolve, reject)=>{
        Pool.query(`INSERT INTO recipes (id, title, ingredients, photo, category_id) VALUES (${id}, '${title}', '${ingredients}', '${photo}', ${category_id})`, (err, result)=>{
            if(!err){
                return resolve(result)
            }else {
                reject(err)
            }
        })
    })
}

const putRecipe = async (data) =>{
    let {id, title, ingredients, photo, category_id} = data

    return new Promise((resolve, reject)=>{
        Pool.query(`UPDATE recipes SET title='${title}', ingredients='${ingredients}', photo='${photo}', category_id= ${category_id} WHERE id= ${id}`, (err, result)=>{
            if(!err){
                return resolve(result)
            }else {
                reject(err)
            }
        })
    })
}

module.exports = {getAllRecipes, getRecipesSpec, getRecipesCount, inputRecipe, putRecipe, getRecipeById, deleteRecipe}
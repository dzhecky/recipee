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
const getRecipesByUserId = async (users_id) => {
    return new Promise((resolve, reject)=>{
        Pool.query(`SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM recipes JOIN category ON recipes.category_id=category.id
         WHERE users_id='${users_id}'`, (err, result)=>{
            if(!err){
                return resolve(result)
            }else {
                reject(err)
            }
        })
    })
}
const getRecipesByCategory = async (category_id) => {
    return new Promise((resolve, reject)=>{
        Pool.query(`SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM recipes JOIN category ON recipes.category_id=category.id
        WHERE category_id='${category_id}'`, (err, result)=>{
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
        Pool.query(`SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, recipes.users_id, recipes.category_id, category.name AS category, category.id AS category_id FROM recipes JOIN category ON recipes.category_id=category.id 
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
    let {id, title, ingredients, photo, category_id, uuid} = data

    return new Promise((resolve, reject)=>{
        Pool.query(`INSERT INTO recipes (title, ingredients, photo, category_id, users_id) VALUES ('${title}', '${ingredients}', '${photo}', ${category_id}, '${uuid}')`, (err, result)=>{
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

module.exports = {getAllRecipes, getRecipesByUserId, getRecipesByCategory, getRecipesSpec, getRecipesCount, inputRecipe, putRecipe, getRecipeById, deleteRecipe}
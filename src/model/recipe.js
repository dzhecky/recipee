const Pool = require('../config/db')

const getAllRecipes = async () => {
    return new Promise((resolve, reject)=>{
        Pool.query(`SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category, users.name AS author FROM recipes JOIN category ON recipes.category_id=category.id
        JOIN users ON recipes.food_writer = users.id;`, (err, result)=>{
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
        Pool.query(`SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category, users.name AS author FROM recipes JOIN category ON recipes.category_id=category.id
        JOIN users ON recipes.food_writer = users.id WHERE recipes.id='${id}';`, (err, result)=>{
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
        Pool.query(`INSERT INTO recipes (id, title, ingredients, photo, category_id, food_writer) VALUES (${id}, '${title}', '${ingredients}', '${photo}', ${category_id}, ${food_writer})`, (err, result)=>{
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

module.exports = {getAllRecipes, inputRecipe, putRecipe, getRecipeById, deleteRecipe}
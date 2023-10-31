const Pool = require('../config/db')

const getAllRecipes = async () => {
    console.log('sukses test getallrecipes');
    return new Promise((resolve, reject)=>{
        Pool.query(`SELECT * FROM recipes;`, (err, result)=>{
            if(!err){
                return resolve(result)
            }else {
                reject(err)
            }
        })
    })
}

const getRecipeById = async (id) => {
    console.log('sukses test getallrecipes');
    return new Promise((resolve, reject)=>{
        Pool.query(`SELECT * FROM recipes WHERE id='${id}';`, (err, result)=>{
            if(!err){
                return resolve(result)
            }else {
                reject(err)
            }
        })
    })
}

const deleteRecipe = async (id) => {
    console.log('sukses test getallrecipes');
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
    console.log('succes input recipe');
    let {title, content} = data

    return new Promise((resolve, reject)=>{
        Pool.query(`INSERT INTO recipes (title, content) VALUES ('${title}', '${content}')`, (err, result)=>{
            if(!err){
                return resolve(result)
            }else {
                reject(err)
            }
        })
    })
}

const putRecipe = async (data) =>{
    console.log('succes input recipe');
    let {id, title, content} = data

    return new Promise((resolve, reject)=>{
        Pool.query(`UPDATE recipes SET title='${title}', content='${content}' WHERE id='${id}'`, (err, result)=>{
            if(!err){
                return resolve(result)
            }else {
                reject(err)
            }
        })
    })
}

module.exports = {getAllRecipes, inputRecipe, putRecipe, getRecipeById, deleteRecipe}
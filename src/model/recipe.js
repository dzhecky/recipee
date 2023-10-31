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

module.exports = {getAllRecipes}
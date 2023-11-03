const Pool = require('../config/db')

const getCategory = async () => {
    return new Promise((resolve, reject)=>{
        Pool.query(`SELECT * FROM category;`, (err, result)=>{
            if(!err){
                return resolve(result)
            }else {
                reject(err)
            }
        })
    })
}

const getCategoryById = async (id) => {
    return new Promise((resolve, reject)=>{
        Pool.query(`SELECT * FROM category WHERE id='${id}';`, (err, result)=>{
            if(!err){
                return resolve(result)
            }else {
                reject(err)
            }
        })
    })
}

module.exports = {getCategory, getCategoryById}
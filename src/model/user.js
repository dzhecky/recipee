const Pool = require('../config/db')


const createUser = async (data) =>{
    let{id, name, email, password} = data
    return new Promise((resolve, reject)=>{
        Pool.query(`INSERT INTO users (id, name, email, password) VALUES (${id}, '${name}', '${email}', '${password}')`, (err, result)=>{
            if(!err){
                return resolve(result)
            } else{
                return reject(err)
            }
        })
    })
}

const getAllUser = async () => {
    return new Promise((resolve, reject)=>{
        Pool.query(`SELECT * FROM users`, (err, result)=>{
            if(!err){
                return resolve(result)
            }else {
                reject(err)
            }
        })
    })
}

const getUserById = async (id) => {
    return new Promise((resolve, reject)=>{
        Pool.query(`SELECT * FROM users WHERE id='${id}';`, (err, result)=>{
            if(!err){
                return resolve(result)
            }else {
                reject(err)
            }
        })
    })
}

const deleteUser = async (id) => {
    return new Promise((resolve, reject)=>{
        Pool.query(`DELETE FROM users WHERE id=${id};`, (err, result)=>{
            if(!err){
                return resolve(result)
            }else {
                reject(err)
            }
        })
    })
}

const updateUser = async (data) =>{
    let {id, name, email, password} = data

    return new Promise((resolve, reject)=>{
        Pool.query(`UPDATE users SET name='${name}', email='${email}', password='${password}' WHERE id= ${id}`, (err, result)=>{
            if(!err){
                return resolve(result)
            }else {
                reject(err)
            }
        })
    })
}

module.exports = {createUser, getAllUser, deleteUser, updateUser, getUserById}
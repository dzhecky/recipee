const Pool = require('../config/db')

const getAllUser = async (email) => {
    return new Promise((resolve, reject)=>{
        Pool.query(`SELECT * FROM users WHERE email='${email}'`, (err, result)=>{
            if(!err){
                return resolve(result)
            }else {
                reject(err)
            }
        })
    })
}
const showUser = async () => {
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
const addUser = async (data) => {
    let {uuid, email, password, username} = data
    return new Promise((resolve, reject)=>{
        Pool.query(`INSERT INTO users(uuid, email, password, username) VALUES ('${uuid}', '${email}',
        '${password}', '${username}');`, (err, result)=>{
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

module.exports = {getAllUser, showUser, addUser, deleteUser, updateUser, getUserById}
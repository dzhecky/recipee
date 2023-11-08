const {getAllUser, addUser, deleteUser, updateUser, getUserById, showUser} = require('../model/user')
const { v4: uuidv4 } = require('uuid');
const argon2 = require('argon2');
const {generateToken} = require('../helper/token')


const userController = {
    register : async (req, res, next) =>{
        let {email, password, username} = req.body
        if(!email || !password || !username){
            res.status(400).json({status:400, message: 'must be filled'})
        }
        let user = await getAllUser(email)
        if(user.rowCount==1){
            return res.status(400).json({status:400, message: 'email already exist'})
        }

        password = await argon2.hash(password)

        let data = {
            uuid : uuidv4(),
            email,
            password,
            username
        }
        let result = await addUser(data)
        console.log(result);
        res.status(200).json({status: 200, message: 'register success'})
    },
    login : async (req, res, next)=>{
        let {email, password} = req.body
        if(!email || !password){
            res.status(400).json({status:400, message:'please fill username and password'})
        }

        let {rows, rowCount} = await getAllUser(email)
        let user = rows[0]
        if(rowCount==0){
            return res.status(400).json({status:400, message: 'email doesnt exist, please register!'})
        }

        let isVerify = await argon2.verify(user.password,password)
        if(!isVerify){
            return res.status(400).json({message: 'wrong password'})
        }

        delete user.password

        let token = generateToken(user)
        user.token = token

        console.log(user);
        res.status(200).json({status:200, message:'Login success', data: user})
    },
    getUsers : async (req, res, next)=> {
        let users = await showUser()
        let data = users.rows
        if(!data){
            return res.status(404).json({message: 'failed to get data users'})
        }

        res.status(200).json({message : 'succes get data from users', data})
    },
    getUserId : async (req, res, next)=> {
        let id = req.params.id
        let userPerson = await getUserById(id)
        let data = userPerson.rows[0]
        if(!data){
            return res.status(404).json({message: 'failed to get data users'})
        }
        res.status(200).json({message : 'succes get data from users', data})
    },
    dropUser : async (req, res, next) =>{
        let id = req.params.id
        let user = await deleteUser(id)
        if(user.rowCount == 0){
            return res.status(404).json({message: 'failed to delete user'})
        }
        res.status(200).json({message : 'succes delete user'})
    },
    putUser : async (req, res, next) =>{
        let id = req.params.id
        let {name, email, password} = req.body

        let userData = await getUserById(id)
        if(userData.rowCount == 0){
            return res.status(404).json({message: 'failed , data not found!'})
        }

        let data = userData.rows[0]
        let newData = {
            id : data.id,
            name : name || data.name,
            email : email || data.email,
            password : password || data.password
        }

        let result = await updateUser(newData)
        console.log(result);

        if(!result){
            return res.status(404).json({message: 'failed update user'})
        }

        res.status(200).json({message : 'succes update user'})
    }
}

module.exports = userController
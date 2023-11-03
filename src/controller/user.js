const {createUser, getAllUser, deleteUser, updateUser, getUserById} = require('../model/user')


const userController = {
    inputUser : async (req, res, next) => {
        let {id, name, email, password} = req.body
        if(!id || !name || !email || !password){
            return res.status(404).json({message: 'failed input data, all is required'})
        }
        
        let data = {id, name, email, password}
        let result = await createUser(data)
        if(!result){
            return res.status(404).json({message: 'failed to input data at users'})
        }
        res.status(200).json({message : 'succes input data to users', data})
    },
    getUsers : async (req, res, next)=> {
        let recipes = await getAllUser()
        let data = recipes.rows
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
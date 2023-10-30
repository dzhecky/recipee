const express = require('express')

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }))

let users = [
    {'id' : 1, 'name': 'bayu'},
    {'id' : 2, 'name': 'arif'},
    {'id' : 3, 'name': 'roji'}
]

app.get('/users',(req, res, next)=>{
    res.json({messsage: 'success', data:users})
})
app.get('/users/:id',(req, res, next)=>{
    let id  = req.params.id
    let user
    users.forEach((item =>{
        if(item.id  == id){
            user = item
        }
    }))
    if(!user){
        res.status(404).json({messsage: 'user not found'})
    }
    console.log('test', user);
    res.status(200).json({messsage: 'success', data:user})
})
app.post('/users',(req, res, next)=>{
    let {id, name} = req.body
    users = [...users, {'id':parseInt(id),name}]
    res.json({messsage: 'success add users', data:users})
})
app.put('/users/:id',(req, res, next)=>{
    let id  = req.params.id
    let {name} = req.body

    let user
    let new_users = users.map((item)=>{
        if(item.id == id){
            console.log('new id and name', item);
            item.name = name
            user = item
            return item
        }else{
            return item
        }
    })
    if(!user){
        res.status(404).json({messsage: 'user not found'})
    }

    users = [...new_users]
    res.json({messsage: 'success add users', data:users})
})
app.delete('/users/:id',(req, res, next)=>{
    let id  = req.params.id

    let user
    let new_users = []
    users.forEach((item)=>{
        if(item.id == id){
            user = item
        } else {
            new_users = [...new_users, item]
        }
    })
    if(!user){
        res.status(404).json({messsage: 'user not found failed delete data'})
    }

    users = [...new_users]
    res.json({messsage: `success delete data ${user.name}`, data:users})
})
app.get('/',(req, res, next)=>{
    res.json({messsage: 'success', data:'server succes running on port 3000'})
})

app.listen(port,()=>{
    console.log(`app running on port ${port}`);
})
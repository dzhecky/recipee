const express = require('express')
const Router = require('./src/router')

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }))

app.get('/',(req, res, next)=>{
    res.json({messsage: 'success', data:'server succes running on port 3000'})
})
app.use(Router)

app.listen(port,()=>{
    console.log(`app running on port ${port}`);
})
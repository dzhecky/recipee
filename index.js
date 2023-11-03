const express = require('express')
const user = require('./src/router/user')
const category = require('./src/router/category')
const recipe = require('./src/router/recipe')
const cors = require('cors')
const morgan = require('morgan')

const corsOptions = {
    origin : '*',
    optionSuccessStatus : 200
}

const app = express()
const port = 3000

app.use(cors(corsOptions))
app.use(morgan('combined'))

app.use(express.urlencoded({ extended: false }))

app.get('/',(req, res, next)=>{
    res.json({messsage: 'success', data:'server succes running on port 3000'})
})
app.use('/user', user)
app.use('/category', category)
app.use('/recipe', recipe)

app.listen(port,()=>{
    console.log(`app running on port ${port}`);
})
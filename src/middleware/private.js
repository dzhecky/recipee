const jwt = require('jsonwebtoken')
require('dotenv').config()

const protect = async (req, res, next) =>{
    try {
        let {authorization} = req.headers
        let bearer = authorization.split(' ')

        let decode = jwt.decode(bearer[1], process.env.JWT_TOKEN)
        req.payload = decode
        next()
    } catch (error) {
        res.status(400).json({status: 400, message:"token invalid"})
    }
}

module.exports = {protect}
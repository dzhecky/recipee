const {getCategory, getCategoryById} = require('../model/category')

const categoryController = {
    cekCategory : async (req, res, next)=> {
        let recipes = await getCategory()
        let data = recipes.rows
        if(!data){
            return res.status(404).json({message: 'failed to get data from category'})
        }
        res.status(200).json({message : 'succes get data from category', data})
    },
    getId : async (req, res, next)=> {
        let id = req.params.id
        let category = await getCategoryById(id)
        let data = category.rows[0]
        if(!data){
            return res.status(404).json({message: 'failed to get data by id from recipe'})
        }
        res.status(200).json({message : 'succes get data by id from recipe', data})
    }

}

module.exports = categoryController
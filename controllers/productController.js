const { User, Product, Category } = require('../models')

class ProductController {
    static async getProducts(req, res, next) {
        try {

            let offset = 0
            let limit = 2
            const { page, title, size, CategoryId } = req.query

            if (page) {
                offset = (page * limit) - limit
            }

            if (size) {
                limit = size
            }

            let template = {
                offset,
                limit,
                order: [
                    ['id', 'ASC']
                ],
                where: {},
                include: [Category, User]
            }

            if (CategoryId) {
                template.where.CategoryId = CategoryId
            }
            if (title) {
                template.where.title = { [Op.iLike]: `%${title}%` }
            }


            const response = await Product.findAndCountAll(template)
            res.status(200).json(response)

        } catch (err) {
            next(err)
        }

    }

    static async detailProduct (req, res, next) {
        try {
            const { id } = req.params
            console.log({id});
            const product = await Product.findOne({
                include: [{
                    model: User
                }, {
                    model: Category
                }],
                where:{ id }
            }) 
            if (!product) throw { name: `productNotFound`} 
            res.status(200).json(product)
            
        } catch (error) {
            next(error)
        }
    
    }
}

module.exports = ProductController
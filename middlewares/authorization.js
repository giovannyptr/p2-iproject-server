const { MyCart } = require('../models')

const authorization = async (req, res, next) => {
    const UserId = req.user.id
    const ProductId = Number(req.body.id)

    try {

        const cart = await MyCart.findOne({where: {Productid: ProductId, UserId: UserId}})

        if(!cart) {
              throw { message: 'NO_ACCESS'}    
            
        }else {
            next()
        }   

    }catch(err) {
        next(err)
    }
}

module.exports = authorization
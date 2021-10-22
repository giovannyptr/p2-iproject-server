const { User, Category, Product, MyCart } = require('../models')
const { nanoid } = require('nanoid');


class CartController {

    static async addCart(req, res, next) {
      console.log('req.body=', req.body);
        try {
            console.log(req.body.ProductId, 'cek');
            const findCart = await MyCart.findOne({
                where: {
                    UserId: req.user.id,
                    ProductId: req.body.ProductId
                }

            })
            if (findCart) {
                throw ({ name: `Already added` })
            }
            else {
                const findProduct = await Product.findByPk(req.body.ProductId)
                console.log(findProduct);


                if (findProduct) {
                    const result = await MyCart.create({ UserId: req.user.id, ProductId: req.body.ProductId, quantity: 1 })
                    console.log(req.body.ProductId, 'cek lagi');
                    res.status(201).json(result)
                }

                else {
                    throw ({ name: `productNotFound` })
                }
            }

        } catch (error) {
            next(error)
        }
    }

    static async getMyCart(req, res, next) {

        try {
            const result = await User.findOne({
                include: Product,
                where: {
                    id: req.user.id
                }
            })
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }

    }

    static async removeCart(req, res, next) {

        try {

            const { Productid } = req.body

            console.log(req.body.ProductId, "<<<Cek");

            const cart = await MyCart.findOne({where: {UserId: req.user.id, ProductId: req.body.ProductId}})

            if (!cart) {
                throw { name: 'Yourcartisempty' }
            }

            const removeCart = await MyCart.destroy({ where: {UserId: req.user.id, ProductId: req.body.ProductId} })

            res.status(200).json({ message: `Your product have been removed` })

        } catch (error) {
            
            next(error)
        }
    }

      
}

module.exports = CartController
const { User, Category, Product, MyCart } = require('../models')

class CartController {

    static async addCart(req, res, next) {
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
                const findProduct = await Post.findByPk(req.body.ProductId)
                console.log(findProduct);


                if (findProduct) {
                    const result = await MyCart.create({ UserId: req.user.id, ProductId: req.body.ProductId, quantity: 1 })
                    console.log(req.body.PostId, 'cek lagi');
                    res.status(201).json(result)
                }

                else {
                    throw ({ name: `Product id Not Found` })
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

            const { id } = req.params

            const cart = await MyCart.findByPk(id)

            if (!cart) {
                throw { name: 'Yourcartisempty' }
            }

            await MyCart.destroy({ where: { id } })

            res.status(200).json({ message: `Your product have been removed` })

        } catch (error) {
            next(error)
        }
    }

    static async quantity(req, res, next) {
        try {
            let { quantity } = req.body;
            const id = Number(req.params.id);

            const beforeUpdate = await MyCart.findOne({ where: { id } });

            if (!beforeUpdate) {
                throw { name: "notFound" };
            }

            const result = await MyCart.update({ quantity }, { where: { id }, returning: true });


            res.status(200).json({msg: 'Your cart have been updated'});


        } catch (err) {
            next(err);
        }
    }
}

module.exports = CartController
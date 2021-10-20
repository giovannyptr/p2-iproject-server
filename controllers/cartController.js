const { User, Category, Product, MyCart } = require('../models')
const { nanoid } = require('nanoid');
const calculatePrice = require('../helpers/calculatePrice')
const createTransaction = require('../helpers/midtrans')

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

   

    static async checkoutProducts(req, res, next) {
        const { productIds } = req.body;
        try {
          const products = await Product.findAll({
            where: {
              id: productIds,
            },
          });
    
          if (products.length === 0 || products.length !== productIds.length) {
            throw {
              name: "productNotFound",
            };
          }
    
          const totalPrice = calculatePrice(products);
          const order_id = nanoid(30);
          const items_detail = products.map((e) => {
            return {
              price: e.price,
              title: e.title,
              quantity: 1,
            };
          });
    
          const parameter = {
            transaction_details: {
              order_id: order_id,
              gross_amount: totalPrice,
            },
            credit_card: {
              secure: true,
            },
            items_detail: items_detail,
            customer_details: {
              email: req.user_login.email,
            },
          };

          const results = await createTransaction(parameter);
    
          const payload = products.map((course) => {
            return {
              UserId: req.user_login.id,
              CourseId: course.id,
              status: "pending",
              order_id: order_id,
            };
          });
          await UserCourse.bulkCreate(payload);
          res.status(201).json({
            code: 201,
            message: "success create new transaction",
            token: results.token,
            redirect_url: results.redirect_url,
          });
        } catch (err) {
          next(err);
        }
      }

      static async notifMidtransHandler(req, res, next) {
        const { transaction_status, order_id } = req.body;
    
        try {
          if (
            transaction_status === "settlement" ||
            transaction_status === "capture"
          ) {
            const results = await Product.update(
              {
                status: "active",
              },
              { where: { order_id }, returning: true }
            );
    
            const productIds = results[1].map((element) => {
              return element.ProductId;
            });
    
            const products = await Product.findAll({
              where: {
                id: productIds,
              },
            });
    
            const instructors = products.map((course) => {
              return {
                price: course.price,
                instructor_id: course.instructor_id,
              };
            });
    
            res.status(200);
          }
        } catch (err) {
          next(err);
        }
      }
}

module.exports = CartController
const { User, Product, Category, Order, orderDetail } = require('../models')
const { Op } = require('sequelize')
const calculatePrice = require('../helpers/calculatePrice')
const axios = require('axios')
const midtransClient = require('midtrans-client')

class ProductController {
    static async getProducts(req, res, next) {
        try {

            let offset = 0
            let limit = 2
            const { page, name, size, CategoryId } = req.query
            console.log(req.query.name);

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
            if (name) {
                template.where.name = { [Op.iLike]: `%${name}%` }
            }


            const response = await Product.findAndCountAll(template)
            res.status(200).json(response)

        } catch (err) {
            next(err)
        }

    }

    static async detailProduct(req, res, next) {

        try {
            const { id } = req.params
            console.log({ id });
            let product = await Product.findOne({
                include: [{
                    model: User
                }, {
                    model: Category
                }],
                where: { id }
            })
            if (!product) throw { name: `productNotFound` }

            var options = {
                method: 'GET',
                url: `https://youtube-advanced-search.p.rapidapi.com/video/${product.name}`,
                headers: {
                  'x-rapidapi-host': 'youtube-advanced-search.p.rapidapi.com',
                  'x-rapidapi-key': 'be37e2735fmshae61ca798734023p116c5cjsn16fed3e307e5'
                }
              };

            const videos = await axios(options)  

            console.log(videos.data);
            

            res.status(200).json({product, videos : videos.data})

        } catch (error) {
            next(error)
        }

    }


    static async order(req, res, next) {
        try {
            const products = req.body

            const order = await Order.create({ UserId: req.user.id, total: calculatePrice(products), date: new Date(), status: 'pending' })

            const payload = products.map((each) => {
                return { OrderId: order.id, ProductId: each.id }
            })

            const orderDetails = await orderDetail.bulkCreate(payload)
            console.log(orderDetail, "cek");

            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: 'SB-Mid-server-S5ZhpVBKVz3QUhtj81U9-xkk'
            });

            let parameter = {
                "transaction_details": {
                    "order_id": order.id,
                    "gross_amount":  calculatePrice(products)
                },
                "credit_card":{
                    "secure" : true
                },
                "customer_details": {
                    "email": req.user.email,
                }
            };

            const transaction = await snap.createTransaction(parameter)

            console.log(transaction, "<<<<<<<");

            res.status(200).json(transaction)


        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = ProductController
const router = require('express').Router()
const userController= require('../controllers/userController')
const productController = require('../controllers/productController')
const cartController = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')
const errorHandler = require('../middlewares/errorHandler')


router.get('/', (req, res) => {
    res.send('this is hackbeauty')
})

router.post('/register', userController.register)
router.post('/login', userController.login)

router.get('/products', productController.getProducts)
router.get('/products/:id', productController.detailProduct)

router.use(authentication)

router.post('/mycarts', cartController.addCart)
router.get('/mycarts', cartController.getMyCart)
router.delete('/mycarts/:id', cartController.removeCart)

router.post('/order', productController.order)

router.use(errorHandler)


module.exports = router
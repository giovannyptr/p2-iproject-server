const router = require('express').Router()
const userController= require('../controllers/userController')
const productController = require('../controllers/productController')
const cartController = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const errorHandler = require('../middlewares/errorHandler')


router.get('/', (req, res) => {
    res.send('this is a blog website')
})

router.post('/register', userController.register)
router.post('/login', userController.login)

router.get('/products', productController.getProducts)
router.get('/products/:id', productController.detailProduct)

router.use(authentication)

router.post('/mycarts', authorization, cartController.addCart)
router.get('/mycarts', cartController.getMyCart)
router.patch('/mycarts/:id', authorization, cartController.quantity)
router.delete('/mycarts/:id', authorization, cartController.removeCart)

router.use(errorHandler)


module.exports = router
const router = require('express').Router()
const userController= require('../controllers/userController')
const productController = require('../controllers/productController')
const cartController = require('../controllers/cartController')


router.get('/', (req, res) => {
    res.send('this is a blog website')
})

router.post('/register', userController.register)
router.post('/login', userController.login)

router.get('/categories', productController.getCategory)
router.get('/products', productController.getProducts)
router.post('/mycarts', cartController.addCart)
router.get('/mycarts', cartController.gerCart)
router.patch('/mycarts/:id', cartController.quantity)
router.delete('/mycarts/:id', cartController.removeCart)


module.exports = router
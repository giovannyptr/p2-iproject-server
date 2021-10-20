const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = async (req, res, next) => {

    //set headers didapat dari postman
    const { access_token } = req.headers

    //convert access_token jadi payload
    try {
        const payload = verifyToken(access_token) //dapat id dan email

        //validasi berdasarkan id dan email
        const foundUser = await User.findOne({ where: { id: payload.id, email: payload.email } })

        if (!foundUser) {
            throw { message: 'authenticationErr' }
        }

        //kalau ketemu kita kasih penanda
        req.user = {
            id: foundUser.id,
            email: foundUser.email,
            role: foundUser.role
        }

        //kasih lewat
        next()

    } catch (err) {
        next(err)
    }

}

module.exports = authentication


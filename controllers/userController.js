const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')

class UserController {

    static async register(req, res, next) {

        try {
            const { email, password } = req.body
            const response = await User.create({email, password })

            res.status(201).json({ id: response.id, email: response.email})

        } catch (err) {
            next(err)

        }
    }

    static async login(req, res, next) {

        try {
            const { email, password } = req.body

            //cari email
            const response = await User.findOne({ where: { email } })
            if (!response) {
                throw ({ name: 'unauthorized' })
            }

            //check password
            if (!comparePassword(password, response.password)) {
                throw ({ name: 'unauthorized' })
            }

            //create token
            const payload = {
                id: response.id,
                email: response.email
            }

            const token = createToken(payload)
            res.status(200).json({ access_token: token })

        } catch (err) {
            console.log(err);
            next(err)

        }
    }

}

module.exports = UserController
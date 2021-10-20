const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')

class UserController {

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
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'inisangatamansekali'

const createToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET)
}

const verifyToken = (token) => {
    console.log(token);
    return jwt.verify(token, JWT_SECRET)
}


module.exports = {
    createToken,
    verifyToken
}
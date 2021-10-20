const bcrypt = require('bcrypt')

const hashingPassword = (password) => {
    return bcrypt.hashSync(password, 8)
}

const comparePassword = (password, hashedPassword) => {
    console.log(password)
    console.log(hashedPassword);
    return bcrypt.compareSync(password, hashedPassword)
}

console.log(hashingPassword('inigio'));

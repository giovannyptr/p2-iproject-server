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


/**
 * BIKIN STRUKTUR TABLE
 * 
 * PRODUCT
 * 
 * ORDER:
 * 1. ID
 * 2. USERID
 * 3. DATE
 * 4. TOTAL:INT
 * 5. STATUS: STRING PENDING BY DEFAULT
 * 
 * ORDER DETAIL:
 * 1. ID
 * 2. ORDERID:
 * 3. PRODUCTID 
 * 
 * CLIENT 
 * BIKIN FITUR NAMBAHIN KE CART
 * ORDERPAGE.VUE --> TAMPILKAN DATA PRODUCTS CART -> TAMBAHIN TOMBOL KIRIM KE SERVER
 * CART KIRIM KE SERVER
 * 
 * ini bikin button kirim data orderpage ke server
 * 
 * kalo data diterima di server, insert ke table order
 * 
 * insert ke table order -> 
 * const order  = Order.create({})
 * 
 * const payload = [{OrderId: Order.id, ProductId: pRODUCT.id}]  DATA DARI CLIENT DIBIKIN BENTUK PAYLOAD
 * 
 * const orderDetail = orderDetail.insertMany(payload)
 * 
 *
 * 
 * SERVER
 * BIKIN ENDPOINT POST ORDER 
 * 
 * kerjain challenge
 * 
 */
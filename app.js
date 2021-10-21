require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes/index')
const port = process.env.PORT || 3000

app.use(require("cors")());

//bodyparser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(routes)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
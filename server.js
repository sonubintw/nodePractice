const http = require('http')
const routes = require('./routes_PLANENODE')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.post('/add-product', (req, res, next) => {
    // console.log("bye");
    res.send(`<html lang="en">
        <h1>Add product page</h1>
        <form action="/product" method="POST">
            <input type="text" name="title"></input>
            <button type="submit">Add product</button>
        </form>
    </html>`)
    // next()

})

app.use('/product', (req, res, next) => {

    console.log(req.body);

    res.redirect('/')
})


app.use('/', (req, res, next) => {
    console.log("hihihih");
    res.send(`<html lang="en">
        <h1>HIHIHIHIHIH</h1>
    </html>`)
    // next()

})



app.listen(4000)

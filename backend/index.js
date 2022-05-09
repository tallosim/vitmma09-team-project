const express = require('express')
const bodyParser = require('body-parser')
const sanitize = require('sanitize')

const PORT = 8000

const app = express()

app.use(bodyParser.json())
app.use(sanitize.middleware)

app.use((req, res, next) => {
    res.tpl = {}

    return next()
})

require('./routes')(app)

app.use((err, req, res, next) => {
    console.log(err)
    return res.status(err.code || 500).json({ message: err.msg })
})

const server = app.listen(PORT, () => {
    console.log('http://localhost:' + PORT)
})
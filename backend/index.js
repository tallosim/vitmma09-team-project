const express = require('express')
const bodyParser = require('body-parser')
const sanitize = require('sanitize')
const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.HTTP_PORT || 8000

const app = express()

app.use(bodyParser.json())
app.use(sanitize.middleware)

app.use((req, res, next) => {
    res.tpl = {}

    return next()
})

require('./routes/socket')(app)
require('./routes/route')(app)

app.use((req, res, next) => {
    res.status(404).send('Endpoint not found!')
})

app.use((err, req, res, next) => {
    const log = err
    log.msg = `[express]: ${err.msg}`
    console.log(err)
    return res.status(err.code || 500).json({ message: err.msg })
})

const server = app.listen(PORT, () => {
    console.log('http://localhost:' + PORT)
})
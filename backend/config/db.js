const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/VITMMA09')

module.exports = mongoose
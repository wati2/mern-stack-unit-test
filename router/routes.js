const express = require('express')
const app = express()
const birds = require('./birds')
const root = require('./root')

app.use('/', root)
app.use('/birds',birds)

module.exports = app
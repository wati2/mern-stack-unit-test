const express = require('express')
const app = express()
const birds = require('./router/birds')
const root = require('./router/root')
const test = require('./router/test3')

app.use('/', root)
app.use('/birds',birds)
app.use('/test3',test)

module.exports = app
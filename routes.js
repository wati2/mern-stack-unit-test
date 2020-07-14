const express = require('express')
const app = express()
const birds = require('./router/birds')
const root = require('./router/root')
const test = require('./router/test3')
const test4 = require('./router/test4')

app.use('/', root)
app.use('/birds',birds)
app.use('/test3',test)
app.use('/test4',test4)

module.exports = app
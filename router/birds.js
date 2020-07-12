const express = require('express')
const router = express.Router()

const requestTime = function (req, res, next) {
    req.requestTime = Date()
    console.log(req.requestTime)
    console.log(req.requestTime.toString())
    next()
}

// middleware that is specific to this router
router.use(requestTime);

router.use((req, res, next) =>{
    console.log('LOGGED')
    next()
})

router.get('/', (req,res)=>{
    let responseText = 'Birds home page'
    responseText += ' Requested at: ' + req.requestTime + '' 
    res.send(responseText)
})

router.get('/about', (req, res) =>{
    res.send('About birds')
})

module.exports = router

const express = require('express')
const router = express.Router()



// 라우터 레벨 미들웨어
// 라우터 레벨 미들웨어는 express.ROuter() 인스턴스에 바인드 된다는 점을 제외하면 애플리케이션 레벨 미들웨어와 동일한 방식으로 작동합니다.
router.use((req,res,next) => {
    console.log('Time', Date());
    next();
});

router.get('/', (req,res)=>{
    let responseText = 'Tesst4 home page'
    responseText += ' Requested at: ' + req.requestTime + '' 
    res.send(responseText)
})


router.use('/user/:id', (req, res, next)=>{
    console.log('Request URL:', req.originalUrl);
    next();
}, (req, res, next) => {
    console.log('Request Type:', req.method);
    next();
});

router.get('/user/:id', (req,res,next)=>{
    console.log("req.params.id:"+req.params.id)
    if(req.params.id == 0) next('route');
    else next();
}, (req, res, next) => {
    // render a regular pae
    res.send('regular');
})

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
    console.log(req.params.id);
    res.render('special');
});

// mount the router on the app >> 외부의 routes.js 파일에서 mount 함
// app.use('/', router);

module.exports = router
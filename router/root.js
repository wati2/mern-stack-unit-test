const express = require('express')
const app = express()

// GET method route
app.get('/test', (req, res) => {
    res.send('GET request to the homepage')
})

// POST method route
app.post('/test', (req, res) => {
    res.send('POST request to the homepage')
})

// app.all()은 어떠한 HTTP 메소드로부터도 파생되지 않습니다. 이 메소드는 모든 요청 메소드에 대해 한 경로에서 미들웨어 함수를 로드하는 데 사용됩니다.
// 다음 예에서는, GET, POST, PUT 또는 DELETE 메소드를 사용하는 경우, 또는 http 모듈에서 지원되는 기타 모든 HTTP요청 메소드를 사용하는 경우 드의 "/secret"에 대한 요청을 위하여 핸들러가 실행됩니다.
app.all('/secret', (req,res,next) =>{
    console.log('Accessing the secret section ...')
    next() // pass control to the next handler
})

app.get('/', (req, res) =>{
    res.send('root')
})

// 다음의 라우트 경로는 요청을 /random.text에 일치시킵니다.
app.get('/random.text', (req, res) =>{
    res.send('random.text')
})

// 다음의 라우트 경로는 ab?cd
app.get('/ab?cd', (req, res) =>{
    res.send('ab?cd')
})

// 다음의 라우트 경로는 abcd, abbcd 및 abbbcd 등과 일치합니다
app.get('/ab+cd', (req, res) =>{
    res.send('ab+cd')
})

// 다음의 라우트 경로는 abcd, abxcd, abRADOMcd 및 ab123cd 등과 일치합니다
// * > 와일드카드
app.get('/ab*cd', (req, res) => {
    res.send('ab*cd')
})

// 다음의 라우트 경로는 /abe 및 /abcde와 일치합니다.
app.get('/ab(cd)?e', (req, res)=>{
    res.send('ab(cd)?e')
})

// ?, +, * 및 () 문자는 정규식 문자의 서브세트입니다. 하이픈(-) 및 점(.)은 문자열 기반 경로에 의해 문자 그대로 해석됩니다.

// 정규식을 기반으로 하는 라우트 경로의 예

// 다음의 라우트 경로는 라우트 이름에 "a"가 포함된 모든 항목과 일치합니다.
// app.get(/a/, (req, res) => {
//     res.send('/a/')
// })

// 다음의 라우트 경로는 butterfly 및 dragonfly와 일치하지만, butterflyman 및 dragonfly man 등과 일치하지 않습니다.
// app.get(/.*fly$/, (req,res)=>{
//     res.send('/.*fly$/')
// })

// 라우트 핸들러
// 미들웨어와 비슷하게 작동하는 여러 콜백 함수를 제공하여 요청을 처리할 수 있습니다. 유일한 차이점은 이러한 콜백은 next('route')를 호출하여 나머지 라우트 콜백을 우회할 수도 있다는 점입니다. 이러한 매커니즘을 이용하면 라우트에 대한 사전 조건을 지정한 후, 현재의 라우트를 계속할 이유가 없는 경우에는 제어를 후속 라우트에 전달할 수 있습니다.

// 하나의 콜백 함수는 하나의 라우트를 처리할 수 있습니다.

app.get('/example/a', (req, res) => {
    res.send('Hello from A!')
})

app.get('/example/b', (req, res, next) => {
    console.log('the response will be sent by the next function ...')
    next();
}, (req, res) => {
    res.send('Hello from B!')
})

// 하나의 콜백 함수 배열은 하나의 라우트를 처리할 수 있습니다.
let cb0 = (req, res, next) => {
    console.log('CB0')
    next()
}

let cb1 = (req, res, next) =>{
    console.log('CB1')
    next()
}

let cb2 = (req, res) => {
    res.sond('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);

/**
 * 응답 메소드
 * 
 * 파일이 다운로드 되도록 프롬프트 합니다.
 * res.download()
 * 
 * 응답을 전송합니다.
 * res.end()
 * 
 * JSON 응답을 전송합니다.
 * res.json()
 * 
 * JSONP 지원을 통해 JSON 응답을 전송합니다.
 * res.jsonp()
 * 
 * 요청의 경로를 재지정 합니다.
 * res.redirect()
 * 
 * 보기 템플리트를 렌더링합니다.
 * res.render()
 * 
 * 다양한 유형의 응답을 전송합니다.
 * res.send()
 * 
 * 파일을 옥텟 스트림의 형태로 전송합니다.
 * res.sendFile()
 * 
 * 응답 상태코드를 설정한 후 해당 코드를 문자열로 표현한 내용을 응답 본문으로서 전송합니다.
 * res.sendStatus()
 */


 // app.route()
 // app.route()를 이용하면 라우트 경로에 대하여 체인 가능한 라우트 핸들러를 작성할 수 있습니다. 경로는 한 곳에 지정되어 있으므로, 모듈식 라우트를 작성하면 중복성과 오타가 감소하여 도움이 됩니다. 라우트에 대한 자세한 정보는 Router() 문서를 참조하십시오.

 // 체인 가능한
app.route('/book')
    .get((req,res)=>{
        res.send('Get a random book')
    })
    .post((req,res)=>{
        res.send('Add a book')
    })
    .put((req, res)=>{
        res.send('Update the book')
    })

// express.Router
// express.Router 클래스를 사용하면 모듈식 마운팅 가능한 핸들러를 작성할 수 있습니다. Router 인스턴스는 완전한 미들웨어이자 라우팅 시스템이며, 따라서 "미니 앱(mini-app)"이라고 불리는 경우가 많습니다.

// 모듈식, 마운팅 가능한 핸들러

// 다음 예에서는 라우터를 모듈로서 작성하고, 라우터 모듈에서 미들웨어 함수를 로드하고, 몇몇 라우트를 정의하고, 기본 앱의 한 경로에 라우터 모듈을 마운트 합니다.

module.exports = app
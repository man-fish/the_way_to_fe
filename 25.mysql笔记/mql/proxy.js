const http = require("http")
http.createServer((req,res) => {
        if(req.url == "/"){
            console.log("请求来了")
            console.log("header:",req.headers.host)
        }
        res.end()
        
}).listen(3000)


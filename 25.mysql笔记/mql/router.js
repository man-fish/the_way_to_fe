const http = require("http")
const {db} = require("./db/db")
http.createServer((req,res)=>{
    console.log("有请求进来了")
    console.log(req.url)
    if(req.url =="/ins"){
        console.log("ins")
            const result = db.insert("insert into users(username,pwd) values (?,?)",["893930581","200118yu"])
            result.then(res =>{
                    console.log(res.warningCount)
            })
            res.end()
    }else if(req.url == "/haha"){
    console.log("haha")
        const result = db.query("select cust_name,(select count(*) from orders where orders.cust_id = customs.cust_id) as orders from customs order by cust_id DESC")
        result.then(res =>{
                console.log(res)
        })
    }else if(req.url == "/delete"){
        const result = db.query("update ignore users set username = ?,pwd = ? where username = '893930581' ",["hjkhjkh","dsad"]);
        result.then(res =>{
                console.log(res)
        })
    }else if(req.url == "/getCookie"){
        if(req.headers.host == "diamond.com"){
                console.log(req.headers.cookie)
                res.writeHead(200,{
                    'Set-Cookie':['id=123;max-age=200;domain=a.diamond.com;','abc=567;domain=diamond.com']
                })
                res.end()
        }
    }
}).listen(3000)
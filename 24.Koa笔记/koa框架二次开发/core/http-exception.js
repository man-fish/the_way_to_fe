class HttpException extends Error{
        constructor(msg = "服务器出了一点问题",errorCode = 10000, code = 400){
            super()
            this.errCode = errorCode
            this.code = code
            this.msg = msg
        }
}

class Success extends HttpException{
    constructor(msg ,errorCode){
        super()
        this.code = 201
        this.msg = msg || "操作成功"
        this.errCode = errorCode || 0
    }
}

class ParameterException extends HttpException{
    constructor(msg,errorCode){
        super()
        this.code = 400
        this.msg = msg||'参数错误'
        this.errorCode = errorCode
     }
}

class AuthFail extends HttpException{
    constructor(msg,errorCode){
        super()
        this.code = 401
        this.msg = msg ||"授权失败"
        this.errCode = errorCode||10004
     }
}

class Forbidden extends HttpException{
    constructor(msg,errCode){
        super()
        this.code = 403 
        this.msg = msg ||"你走丢了" 
        this.errorCode = errCode || 10004
    }
}

class Notfound extends HttpException {
    constructor(msg,errorCode){
       super()
       this.code = 
       this.msg = msg||'没东西呀'
       this.errorCode = errorCode
    }
}

class Failed extends HttpException {
    constructor(msg,errorCode){
       super()
       this.code = 404
       this.msg = msg||'没东西呀'
       this.errorCode = errorCode
    }
}


module.exports = {
    HttpException,
    Success,
    ParameterException,
    AuthFail,
    Forbidden,
    Notfound,
    Failed
}
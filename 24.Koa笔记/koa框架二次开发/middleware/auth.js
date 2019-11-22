const basicAuth = require("basic-auth")

const jwt = require("jsonwebtoken")

class Auth{
    constructor(level){
        Auth.USER = 8
        Auth.ADMIN = 16
        Auth.SUPER_ADMIN = 32
        this.level = level || 1 
    }

    get m(){
        return async(ctx,next)=>{
            const token = basicAuth(ctx.req)
            const errMsg = "token不合法"

            if(!token||!token.name){
                throw new global.errs.Forbidden(errMsg)
            }
            try{
                var decode = jwt.verify(token.name,global.configs.security.sercetKey)

            }catch(e){
                if(e.name == 'TokenExpiredError'){
                    errMsg = "token过期啦"
                }
                throw new global.errs.Forbidden(errMsg)
            }

            if(decode.scope < this.level){
                throw new global.errs.Forbidden("无权")
            }

            ctx.auth =  {
                uid:decode.uid,
                scope:decode.scope
            }

            await next();
        }
    }

    static verifyToken(token){
        try{
            jwt.verify(token,
                global.configs.security.sercetKey)
            return true
        }catch(e){
            return false
        }
    }
}

module.exports = {Auth}
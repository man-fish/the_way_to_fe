const Router = require("koa-router")

const router = new Router({
        prefix:"/user"
})

const bcrypt = require("bcrypt")

const user = require("./../model/user")

const {success} = require("./../lib/helper")

const {RegisterValidator,CompleteValidator} = require("./../validator/validator")

const {Auth} = require("./../../middleware/auth")


router.post("/register",async (ctx,next)=>{
        const v = await new RegisterValidator().validate(ctx)

        const salt = bcrypt.genSaltSync(10)

        const psd = bcrypt.hashSync(v.get('body.password'),salt)   

        const r = await user.register(v.get('body.email'),psd,v.get('body.nickname'))

        if(r){
                success()
        }
})


router.post("/complete", new Auth(1).m ,async (ctx,next)=>{
        const v = await new CompleteValidator().validate(ctx)

        await user.completeProfile(v.get("body.nickname"),ctx.auth.uid)

        success()
})


router.get("/isNameRepeat", async(ctx,next) =>{
        const v = await new CompleteValidator().validate(ctx)
        const is_repeat = await user.isRepeat(v.get("query.nickname"))
        ctx.body = {
                is_repeat
        }
})



router.get("/auth",async ctx=>{
        if(!ctx.header.Authorization){
                ctx.status = 401
                ctx.response.set("WWW-Authenticate",'Basic realm="127.0."')
        }else{
                const user = basicAuth(ctx.req)
                if(!user||!user.pass||!user.name){
                        throw new global.errs.AuthFail()
                }
                console.log(user)
                const uid = await user.verifyEmailLogin(user.name,user.pass)

                // let base64 = req.headers.authorization.split(" ")[1];
                // let userPass = new Buffer(base64, 'base64').toString().split(":");
                // let user = userPass[0];
                // let pass = userPass[1];

                if(uid){
                        ctx.body = "校验成功"
                }
                ctx.status = 401
        }
})

        /**
         HTTP/1.0 401 Unauthorised 
          Server: SokEvo/1.0 
          WWW-Authenticate: Basic realm=”google.com” 
          Content-Type: text/html 
          Content-Length: xxx
        */

module.exports = router
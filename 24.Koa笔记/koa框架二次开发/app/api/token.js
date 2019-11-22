const Router = require("koa-router")

const router = new Router({
    prefix:"/token"
})

const {TokenValidator,VerifyValidator} = require("./../validator/validator")

const user = require("./../model/user")

const {generateToken} = require("./../../core/jwt-token")

const {Auth} = require("./../../middleware/auth")

const WX = require("./service/wx")

router.post("/get",async ctx =>{
        const v = await new TokenValidator().validate(ctx)

        const LoginType = require("./../lib/env")

        let token

        switch(v.get("body.type").toString()){

            case LoginType.USER_MINI_PROGRAD:
                token = await WX.codeToToken(v.get("body.account"))
            break;

            case LoginType.USER_EMAIL:
                token = await defaultToken(v.get("body.account"),v.get("body.sercet"))
            break;
            
            default:
                throw new global.errs.ParameterException("没有相应的处理函数")
        }

        ctx.body = {token}

})

router.post("/verify",async ctx => { 
        const v = await new VerifyValidator().validate(ctx)
        const result = Auth.verifyToken(v.get("body.token"))

        ctx.body = {
                is_valide : result
        }
})

async function defaultToken(account,password){
    const id = await user.verifyEmailLogin(account,password)
    return generateToken(id,Auth.USER)
}


module.exports = router
const util = require("util")

const user = require("./../../model/user")

const axios = require("axios")

const {generateToken} = require("./../../../core/jwt-token")

const {Auth} = require("./../../../middleware/auth")
class WXManager{
    static async codeToToken(code){
        const path = util.format(global.configs.wx.access_token,
            global.configs.wx.appId,
            global.configs.wx.appSercet,
            code)
        const result = await axios.get(path)

        if(result.status !== 200){
            throw new global.errs.AuthFail("微信鉴权失败")
        }
        if(result.data.errCode){
            throw new global.errs.AuthFail('openid获取失败' + result.data.errcode)
        }
        let uid = await user.getByOpenId(result.data.openid)

        if(!uid){
            uid = await user.registByOpenId(result.data.openid)
        }
        return generateToken(uid,Auth.USER)
    }
}

module.exports = WXManager
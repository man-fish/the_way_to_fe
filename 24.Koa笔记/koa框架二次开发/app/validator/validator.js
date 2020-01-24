const {LinValidator,Rule} = require("./../../core/lin-validator")

const user = require("../model/user")

const {LoginType,relationType} = require("./../lib/env")

class RegisterValidator extends LinValidator{
    constructor(){
        super()
        this.email = [
            new Rule("isEmail","请使用正确的邮箱格式")
        ]
        this.password = [
            new Rule("matches","密码不符合规范","^[^\u4e00-\u9fa5]{0,}$")
        ]
        this.password = this.password2
        this.nickname = [
            new Rule("isLength","用户名应包含6到12个字符",{
                min:6,
                max:12
            })
        ]
    }
    validatePassword(vals){
        if(vals.body.password != vals.body.password2 ) {
            throw new global.errs.ParameterException("两次输入的密码不一致")
        }
    }

    async validateEmail(vals){
        const isRepeat = await user.isEmailExist(vals.body.email)
        if(isRepeat){
            throw new global.errs.ParameterException("用户名已存在")
        }
    }
}
class TokenValidator extends LinValidator{
        constructor(){
            super()
            this.account = [
                    new Rule("isLength","账号长度不符合规范",{
                            min:4,
                            max:32
                    })
            ]
            this.sercet = [
                new Rule("optional"),
                //可不添加的参数
                new Rule("isLength","至少需要6个字符",{
                    min:6,
                    max:128
                })
            ]
        }
        validateLoginType(vals){
            if(!vals.body.type){
                throw new Error("type是必须的参数")
            }
            if(!LoginType.isThisType(vals.body.type)){
                throw new Error("type参数不合法")
            }
        }
}
class VerifyValidator extends LinValidator{
    constructor(){
        super()
        this.token = [
            new Rule("isLength","token呢？",{
                min:1
            })
        ]
    }
}

class CompleteValidator extends LinValidator{
    constructor(){
        super()
        this.nickname = [
            new Rule("isLength","姓名不规范",{
                min:6,
                max:12
            })
        ]
    }
}

class RelationValidator extends CompleteValidator{
    constructor(){
        super()
    }
    validateRelationType(vals){
        if(!vals.body.type){
            throw new Error("type是必须的参数")
        }
        if(!relationType.isThisType2(vals.body.type)){
            throw new Error("type参数不合法")
        }
    }
}

class IdValidator extends LinValidator{
    constructor(){
        super()
        this.id = [
            new Rule("isLength","id是必须参数",{
                min:1
            })
        ]
    }
}

class PromiseValidator extends LinValidator{
    constructor(){
        super()
        this.hour = [
            new Rule("isInt","请输入一个正确的小时",{
                min:1,
                max:24
            })
        ]
        this.min = [
            new Rule("isInt","请输入一个正确的分钟",{
                min:1,
                max:60
            })
        ]
        this.cid = [
            new Rule("isLength","cid是必须参数",{
                min:1
            })
        ]
        this.detail = [
            new Rule("isLength","你想承诺点什么呢",{
                min:1
            })
        ]
    }
}
module.exports = {
    RegisterValidator,
    TokenValidator,
    VerifyValidator,
    CompleteValidator,
    RelationValidator,
    IdValidator,
    PromiseValidator
}
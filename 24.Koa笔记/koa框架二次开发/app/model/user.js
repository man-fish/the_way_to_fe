const bcrypt = require("bcrypt")
const {db} = require("./../../core/db")

const user = {
    async register(...arg){
        console.log(arg)
        const result = await db.query("insert into user (email,password,nickname) values (?,?,?)",arg)
        return result
    },
    async isEmailExist(e){
        const result = await db.query("select * from user where email = ?",[e])
        return result.length != 0 ? true : false
    },
    async verifyEmailLogin(email,plainPassword){
        const u = await db.query("select password,id from user where email = ?",[email])

        if(!u[0].password){
            throw new global.errs.AuthFail("用户不存在")
        }
        console.log(plainPassword)
        console.log(u[0].password)
        const correct = bcrypt.compareSync(plainPassword,u[0].password)

        if(!correct){
            throw new global.errs.AuthFail("密码错误！")
        }

        return u[0].id
    },
    async getByOpenId(opId){
        const u = await db.query("select id from user where openid = ?",[opId])
        return u[0].id
    },
    async registByOpenId(opId){
        const result = await db.query("insert into user (openid) values (?)",[opId])
        console.log(result)
        const u = await db.query("select max(id) as id from user")
        return u[0].id
    },
    async completeProfile(nickname,uid){
        const result = await db.query("update user set nickname = ? where id = ?",[nickname,uid])
        console.log(result)
    },
    async isRepeat(nickname){
        const r = await db.query("select count(*) as count from user where nickname = ?",[nickname])
        return r[0].count == 0 ? false : true;  
    },
    async getUserByNickname(nickname){
        const result = await db.query("select id from user where nickname = ?",[nickname])

        return result[0].id
    }
}

module.exports = user
const {db} = require("./../../core/db")

const pro = {
    async give(uid,cid,timestamp,detail){
        const r = await db.query("insert into promise (uid,cid,p_time,is_accepted,detail) values (?,?,?,?,?)",[uid,cid,timestamp,1,detail])
        console.log(r)
    },
    async ask(uid,cid,timestamp,detail){
        const r = await db.query("insert into promise (uid,cid,p_time,detail) values (?,?,?,?)",[uid,cid,timestamp,detail])
        console.log(r)
    },
    async delete(id){
        const r = await db.query("delete from promise where id = ?",[id])
        console.log(r)
    },
    async getAll(uid){
        const r = await db.query("select (select nickname from user where promise.cid = user.id) as cname,is_ok,is_accepted,p_time,detail from promise where uid = ?",[uid])
        return r
    },
    async complete(id){
        const r = await db.query("update promise set is_ok = 1 where id = ?" ,[id])
        console.log(r)
    },
    async pushMsg(){
        const r = await db.query("select id,uid,(select openid from user where promise.uid = user.id) as openId,(select nickname from user where promise.cid = user.id) as cname,is_ok,p_time,detail from promise")
        console.log(r)
        return r
    }
}

module.exports = pro
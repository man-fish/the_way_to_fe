const {relationType} = require("./../lib/env")
const {db} = require("./../../core/db")
const user = require("./user")
const relation = {
    async isExist(nickname,uid){
        const cid = await user.getUserByNickname(nickname)

        if(!cid){
            throw new global.errs.Notfound("没有这位小伙伴哦")
        }

        if(cid == uid){
            throw new global.errs.Forbidden("不能和自己建立关系哦")
        }

        const r = await db.query("select count(*) as count from relation where cid = ? and uid = ?",[cid,uid])

        return r[0].count == 0? false :true    
    },

    async create(uid,nickname,type){
        const tranType = relationType[type]

        const cid = await user.getUserByNickname(nickname)
        if(!cid){
            throw new global.errs.Notfound("没有这位小伙伴哦")
        }
        const r = await db.query("insert into relation (uid,cid,rname) values(?,?,?)",[uid,cid,tranType])

        if(r.warningCount == 0){
            return true
        }

        return false
    },

    async getAll(uid){
            const relations = await db.query("select id,(select nickname from user where relation.cid = user.id) as cname,rname from relation where uid = ?",[uid])

            return relations
    },
    
    async deleteRecode(id){
            const r = await db.query("delete from relation where id = ?",[id])

            if(r.warningCount == 0){
                return true
            }
            return false
    }
}

module.exports = relation
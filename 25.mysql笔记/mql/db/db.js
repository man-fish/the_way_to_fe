const mysql = require("mysql")

const {mysqlConfig} = require("./../configs/configs")

const db = {
    query(sql,args){
        const connection = mysql.createConnection(mysqlConfig)
        return new Promise((resolve,reject)=>{
                connection.query(sql,args,(err,result) => {
                        if(err){
                            console.log(err)
                            resolve({
                                error:err.errno,
                                code:err.code,
                                sqlMessage:err.sqlMessage
                            })
                        }else{
                            resolve(result)
                        }
                connection.end()
            })
        })
    },
    /**
     * @param {*} sql 
     * @param {*} args 
     */
    insert(sql,args){
        const connection = mysql.createConnection(mysqlConfig)
        return new Promise((resolve,reject)=>{
                var dealArg = Object.prototype.toString.call(args[0]) === "[object Array]"? [args] : args
                connection.query(sql,dealArg,(err,result) => {
                        if(err){
                            console.log(err)
                            resolve({
                                error:err.errno,
                                code:err.code,
                                sqlMessage:err.sqlMessage
                            })
                        }else{
                            resolve(result)
                        }
                connection.end()
            })
        })       
    }
}


module.exports = {db}
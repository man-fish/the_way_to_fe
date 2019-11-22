const redis = require('redis')

// 创建客户端
const redisClient = redis.createClient(global.configs.redisConfig.port,global.configs.redisConfig.host)
redisClient.on('error', err => {
    console.error(err)
})

class Redis{
    static set(key, val) {
        if (typeof val === 'object') {
            val = JSON.stringify(val)
        }
        redisClient.set(key, val, redis.print)
    }
    static get(key) {
        const promise = new Promise((resolve, reject) => {
            redisClient.get(key, (err, val) => {
                if (err) {
                    reject(err)
                    return
                }
                if (val == null) {
                    resolve(null)
                    return
                }
    
                try {
                    resolve(
                        JSON.parse(val)
                    )
                } catch (ex) {
                    resolve(val)
                }
            })
        })
        return promise
    }
}


module.exports = Redis
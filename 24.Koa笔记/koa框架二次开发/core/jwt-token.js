const jwt = require("jsonwebtoken")

function generateToken(uid,scope){
        const sercetKey = global.configs.security.sercetKey
        const expiresIn = global.configs.security.expiresIn
        const token = jwt.sign({
            uid,
            scope
        },sercetKey,{
            expiresIn
        })
        return token
}

module.exports = {generateToken}
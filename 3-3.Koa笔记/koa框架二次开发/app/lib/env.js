function isThisType(val){
    for(let key in this){
        if(this[key]==val){
            return true
        }
    }
    return false
}



const LoginType = {
    USER_MINI_PROGRAD:"100",
    USER_EMAIL:"101",
    USER_MOBIL:"102",
    ADMIN_EMAIL:"200",
    isThisType
}



module.exports = {LoginType}


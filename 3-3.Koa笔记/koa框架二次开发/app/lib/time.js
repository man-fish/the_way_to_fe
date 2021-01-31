const toTimestamp = (hour,min) =>{
    let timestamp = hour*60*60*1000 + min*60*1000
    return timestamp
}

module.exports = toTimestamp
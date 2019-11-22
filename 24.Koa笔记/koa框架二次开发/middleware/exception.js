const catchError = async (ctx,next) =>{
        try{
            await next()
        }catch(error){
            const isHttpException = error instanceof global.errs.HttpException
            const isDev = global.configs.environment === 'dev'

            if(isDev && !isHttpException){
                    throw error
            }
            
            if(typeof error.msg == "object"){
                error.msg = error.msg[0]
            }

            if(isHttpException){
                ctx.body = {
                    errMsg : error.msg,
                    errCode : error.errCode,
                    requestUrl : `${ctx.method} ${ctx.path}` 
                }
                ctx.status = error.code
            }else{
                ctx.body = {
                    errMsg : "哎呀，服务器裂开了",
                    errCode : 9999,
                    requestUrl : `${ctx.method} ${ctx.path}` 
                }
                ctx.status = 500
            }

        }
}

module.exports = {catchError}
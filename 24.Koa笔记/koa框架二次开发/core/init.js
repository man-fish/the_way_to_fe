const Router = require("koa-router")
const requireDirectory = require("require-directory")

class InitManager{
    static init(app){
        InitManager.app = app
        InitManager.initHttpException()
        InitManager.initConfig()
        InitManager.initRouter()
    }

    static initRouter(){
        const path = `${process.cwd()}/app/api`
        const modules = requireDirectory(module,path,{
                visit : whenLoadModule
            })
        function whenLoadModule(obj){
            if(obj instanceof Router){
                    InitManager.app.use(obj.routes())
            }
        }
    }

    static initHttpException(){
        const path = `${process.cwd()}/core/http-exception`
        const exceptions = require(path)
        global.errs = exceptions
        console.log(global.errs)
    }

    static initConfig(){
        const path = `${process.cwd()}/configs/config`
        const configs = require(path)
        global.configs = configs
    }

}

module.exports = {InitManager}
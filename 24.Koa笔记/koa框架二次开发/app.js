const Koa = require("koa")
const path = require("path")
const parser = require("koa-parser")
const static = require("koa-static")

const app = new Koa()

const {InitManager} = require("./core/init")
const {catchError} = require("./middleware/exception")

app.use(static(path.join(__dirname,"./static")))
app.use(parser())
app.use(catchError)

InitManager.init(app);

const Redis = require("./core/rdb")
Redis.initMession()

app.listen(3000)
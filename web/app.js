const Koa = require('koa');

const bodyParser = require('koa-bodyparser');
// 控制器
const controller = require('./modules/YH/middleware/controller');

const cors = require("koa2-cors");
// 实体
const model = require("./modules/YH/model");

const app = new Koa();
//收到请求后，会开始调用中间件
// model.sync()


//我这边使用了中间件
app.use(cors())
// log request URL:
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

// parse request body:
app.use(bodyParser());

// add controllers:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');
const model = require('../model')
const fs = require('fs')
let User = model.User;
let menu = model.Menu;
/**
router.get('/', async (ctx, next) => {
  ctx.response.body = `<h1>Index</h1>
      <form action="/signin" method="post">
          <p>Name: <input name="name" value="koa"></p>
          <p>Password: <input name="password" type="password"></p>
          <p><input type="submit" value="Submit"></p>
      </form>`;
});

router.post('/signin', async (ctx, next) => {
  var
      name = ctx.request.body.name || '',
      password = ctx.request.body.password || '';
  console.log(`signin with name: ${name}, password: ${password}`);
  if (name === 'koa' && password === '12345') {
      ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
  } else {
      ctx.response.body = `<h1>Login failed!</h1>
      <p><a href="/">Try again</a></p>`;
  }
});
**/
function sleep(time) {
  var _exit = Date.now() + time * 1000;
  while (Date.now() < _exit) { }
  return;
}
function filesPath() {
  const path = __dirname + '/../../../../page/';
  let arr = []
  fs.readdirSync(path)
    .filter(f => {
      let stat = fs.statSync('../page/' + f)
      if (stat.isDirectory()) {
        return f
      }
    }).forEach(f => {
      // console.log(f)
      // // 模块目录
      fs.readdirSync(path + f + '/').filter(m => {
        return m.endsWith('.html')
      }).forEach(h => {
        arr.push({ name: './page/' + f + '/' + h, value: './page/' + f + '/' + h })
      })
    })
  return arr
}

class Users {
  constructor() {

  }
  // 用户列表
  async list(ctx, next) {
    var user = await User.findAll({});

    ctx.response.body = {
      code: 0,
      data: user,
      msg: 'success'
    }
  }
  // 添加用户
  async add(ctx, next) {
    ctx.response.body = 'success'
  }
  // 添加菜单
  async addMenu(ctx) {
    let data = ctx.request.body;
    console.log(data)
    try {
      let back = await menu.create(data);
      // code == 0 成功 1 失败
      ctx.response.body = {
        code: 0,
        data: {
          id: back.id
        },
        msg: '添加成功'
      }
    } catch (err) {
      console.log(err)
      // 错误处理
      ctx.response.body = {
        code: 1,
        msg: 'err'
      }
    }

  }
  // 菜单列表
  async menuList(ctx) {
    let data = ctx.request.body;
    let page = data.limit * data.page - data.limit
    let find = await menu.findAndCountAll({
      order: [
        ['orderNum', 'asc']
      ],
    });
    try {
      ctx.response.body = {
        code: 0,
        count: find.count,
        data: find.rows,
        msg: 'success'
      }
    } catch (err) {
      ctx.response.body = {
        code: 1
      }
    }
  }
  //  树行菜单
  async treeMenu(ctx) {
    try {
      //举例读取的数据为list的数据
      // 0 为顶级
      let list = await menu.findAll({
        attributes: ['id', 'parentid', 'name']
      });
      ctx.body = {
        code: 0,
        data: list,
        msg: '请求成功'
      }
    } catch (err) {

    }
  }
  // 更新
  async treeUpdata(ctx) {
    let data = ctx.request.body;
    try {
      let back = await menu.update(data, {
        where: {
          id: data.id || ''
        }
      });
      // code == 0 成功 1 失败
      ctx.response.body = {
        code: 0,
        data: {
          id: back.id
        },
        msg: '更新成功'
      }
    } catch (err) {
      console.log(err)
      // 错误处理
      ctx.response.body = {
        code: 1,
        msg: 'err'
      }
    }
  }
  // 删除节点
  async delelem(ctx) {
    let data = ctx.query;
    let find = await menu.destroy({
      where: {
        id: data.id || ''
      }
    });
    try {
      ctx.response.body = {
        code: 0,
        data: find,
        msg: 'success'
      }
    } catch (err) {
      ctx.response.body = {
        code: 1,
        msg: '删除失败'
      }
    }
  }
  async readFile(ctx) {
    let path = filesPath();
    try {
      ctx.response.body = {
        code: 0
        , data: path
        , msg: '读取成功'
      }
    } catch (err) {
      ctx.response.body = {
        code: 1
        , msg: '读取失败'
      }
    }
  }
}

let users = new Users();

module.exports = {
  'GET /xt/user': users.list,
  'POST /xt/add': users.add,
  'GET /xt/menulist': users.menuList,
  'POST /xt/addmenu': users.addMenu,
  'GET /xt/delelem': users.delelem,
  'GET /xt/treemenu': users.treeMenu,
  'POST /xt/updatemenu': users.treeUpdata,
  'GET /read/readfile': users.readFile,
};
const fs = require('fs');
// add url-route in /controllers:
// 扫描controllers 中间件
function addMapping(router, mapping) {
  for (var url in mapping) {
    if (url.startsWith('GET ')) {
      var path = '/api' + url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST ')) {
      var path = '/api' + url.substring(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else if (url.startsWith('PUT ')) {
      var path = '/api' + url.substring(4);
      router.put(path, mapping[url]);
      console.log(`register URL mapping: PUT ${path}`);
    } else if (url.startsWith('DELETE ')) {
      var path = '/api' + url.substring(7);
      router.del(path, mapping[url]);
      console.log(`register URL mapping: DELETE ${path}`);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}

function addControllers(router, dir) {
  // 先导入fs模块，然后用readdirSync列出文件
  // 过滤 js文件
  fs.readdirSync(__dirname + '/../' + dir).filter((f) => {
    return f.endsWith('.js');
  }).forEach((f) => {
    console.log(`process controller: ${f}...`);
    let mapping = require(__dirname + '/../' + dir + '/' + f);
    addMapping(router, mapping);
  });
}


module.exports = function (dir) {
  let controllers_dir = dir || 'controllers';
  let router = require('koa-router')();
  addControllers(router, controllers_dir);
  return router.routes();
};
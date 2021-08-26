const db = require('../db');

module.exports = db.defineModel('menu', {

  parentid: db.STRING(100),
  name: db.STRING(100),
  router: {
    type: db.STRING(100),
    allowNull: true,
  },
  perms: {
    type: db.STRING(100),
    allowNull: true,
  },
  type: db.STRING(100),
  icon: {
    type: db.STRING(100),
    allowNull: true,
  },
  viewPath: {
    type: db.STRING(100),
    allowNull: true,
  },
  // 缓存
  keepAlive: {
    type: db.STRING(100),
    allowNull: true,
  },
  // 显示
  isShow: db.BOOLEAN,
})
const db = require('../db');

module.exports = db.defineModel('users', {
  email: {
    type: db.STRING(100),
    unique: true
  },
  // 密码
  passwd: db.STRING(100),
  // 用户名
  username: db.STRING(100),
  // 昵称
  nikename: db.STRING(100),
  name: db.STRING(100),
  // 性别
  gender: db.BOOLEAN,
  // 头像
  header: db.STRING(100),
  // 部门
  department: db.STRING(100),
  //角色
  role: db.STRING(100),
  // 手机号
  phone: db.INTEGER,
  // 状态
  status: db.BOOLEAN,
  // 备注
  remark: db.STRING(1000),

});


const db = require('../db');

module.exports = db.defineModel('bumen', {
  // 父id
  pid: {
    type: db.STRING(100),
    allowNull: true,
  },
  pname: {
    type: db.STRING(100),
    allowNull: true,
  },
  // 部门名称
  name: db.STRING(100),
  //部门描述
  memo: {
    type: db.STRING,
    allowNull: true
  },
  //部门编码
  code: {
    type: db.STRING,
    allowNull: true
  },
  // 部门类型
  bm_type: {
    type: db.STRING,
    allowNull: true
  },
  // 电话
  phone: {
    type: db.STRING,
    allowNull: true
  },
  // 类名
  typename: {
    type: db.STRING,
    allowNull: true
  },
  //部门状态
  bm_status: {
    type: db.STRING,
    allowNull: true
  },
  // 创建人编号
  creatorname: {
    type: db.STRING(100),
    allowNull: false
  },
  // 创建人姓名
  creatorname: {
    type: db.STRING,
    allowNull: true
  },
  //数据级别
  datalevel: {
    type: db.STRING,
    allowNull: true
  },
})
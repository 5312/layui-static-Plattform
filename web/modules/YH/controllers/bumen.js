const model = require('../model');
const BumenModel = model.Bumen;

class Bumen {
  constructor() { }
  async list(ctx) {
    let cr = await BumenModel.findAndCountAll({
      order: [
        ['orderNum', 'asc']
      ],
    });
    ctx.response.body = {
      code: 0,
      data: cr
    }
  }

}
let bumen = new Bumen();
module.exports = {
  'GET /bumen/list': bumen.list
};
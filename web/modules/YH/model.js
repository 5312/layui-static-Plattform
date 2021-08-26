const fs = require('fs');
const db = require('./db');

let path = __dirname + '/models/'

fs.readdirSync(path).filter((f) => {

  return f.endsWith('.js');

}).forEach((f) => {

  console.log(`import model from file ${f}...`);
  let name = f.substring(0, f.length - 3);
  module.exports[name] = require(__dirname + '/models/' + f);
});

module.exports.sync = async () => {
  await db.sync();
};
const captcha = require('svg-captcha');

function createCode() {
  return captcha.create({
    size: 4,
    ignoreChars: "0o1iIl",
    noise: 3,
    color: true,
    background: "#fff",
    fontSize: 60
  });
}



var captchas = async (ctx, next) => {
  ctx.response.type = 'image/svg+xml';
  let code = createCode()
  // console.log(code.text)
  ctx.response.body = code.data
}


module.exports = {
  'GET /login': captchas
};
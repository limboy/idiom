const fetch = require('node-fetch');
let data = new Map();
let tokenPool = new Set();
let KEY_PREFIX = process.env.KEY_PREFIX;
let TOKEN_ALGORITHM = process.env.TOKEN_ALGORITHM;

function checkValid(token, key) {
  if (!token || token.split('.').length !== 3) {
    return false;
  }

  let [fp, ts, vf] = token.split('.').map((item) => parseInt(item));
  let valid = eval(TOKEN_ALGORITHM);
  let tokenKey = fp + key;
  if (valid && !tokenPool.has(tokenKey)) {
    tokenPool.add(tokenKey);
    return true;
  }
  if (tokenPool.size > 1000) {
    tokenPool.clear();
  }
  return false;
}

export default async function handler(req, res) {
  const action = req.query.action;
  const key = req.query.key;

  if (!key) {
    res.statusCode = 400;
    res.send({ status: 400 });
    return;
  }

  if (!data.has(key)) {
    data.set(key, new Array(7).fill(0));
  }

  if (data.size > 1000) {
    data = new Map();
  }

  switch (action) {
    case 'guess':
      const body = req.body;
      if (!body.attempts || !checkValid(req.query.token, key)) {
        res.statusCode = 400;
        res.send({ status: 400 });
        return;
      }
      // 0 means fail
      let attempts = parseInt(body.success) ? parseInt(body.attempts) : 0;
      let result = data.get(key);
      result[attempts] += 1;
      data.set(key, result.slice());
      res.statusCode = 200;
      res.send({ status: 200 });
      return;
    case 'fetch':
      res.statusCode = 200;
      res.send({ status: 200, data: data.get(key) });
      return;
    default:
      console.log('should not go here');
      break;
  }
  res.statusCode = 400;
  res.send({ status: 400, message: 'something wrong happened' });
}

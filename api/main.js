const fetch = require('node-fetch');
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
  let data = {};

  if (!key) {
    res.statusCode = 400;
    res.send({ status: 400 });
    return;
  }

  data[key] = Array(7).fill(0);
  let result = await Promise.all(
    Array(7)
      .fill(null)
      .map((_, i) => {
        return fetch(
          'https://api.countapi.xyz/get/pyccy/' + KEY_PREFIX + key + '-' + i
        );
      })
  );

  let attempts = [];
  for (let item of result) {
    let attempt = await item.json();
    let value = attempt.value || 0;
    attempts.push(parseInt(value));
  }
  data[key] = attempts;

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
      data[key][attempts] += 1;
      const url =
        'https://api.countapi.xyz/hit/pyccy/' +
        KEY_PREFIX +
        key +
        '-' +
        attempts;

      await fetch(url);
      res.statusCode = 200;
      res.send({ status: 200 });
      return;
    case 'fetch':
      res.statusCode = 200;
      res.send({ status: 200, data: data[key] });
      return;
    default:
      console.log('should not go here');
      break;
  }
  res.statusCode = 400;
  res.send({ status: 400, message: 'something wrong happened' });
}

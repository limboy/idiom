const fs = require('fs');
const Obfuscator = require('javascript-obfuscator');

const source = fs.readFileSync(
  __dirname + '/../src/utils/_fingerprint.js',
  'utf8'
);

const obfuscatedResult = Obfuscator.obfuscate(source, {
  compact: true,
  controlFlowFlattening: true,
  numbersToExpressions: true,
  simplify: true,
  stringArrayShuffle: true,
  splitStrings: true,
  stringArrayThreshold: 1,
});

fs.writeFileSync(
  __dirname + '/../src/utils/fingerprint.js',
  '/* eslint-disable */\n' + obfuscatedResult.getObfuscatedCode()
);

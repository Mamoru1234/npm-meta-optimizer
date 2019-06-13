const { describe, it } = require('mocha');
const { optimizePackageMeta } = require('./MetaUtils');
const { readFile } = require('fs-extra');
const { join } = require('path');

describe('Package meta optimizer', () => {
  it('optimizePackageMeta', async () => {
    const packageText = await readFile(join(__dirname, '../metadata/lodash.json'));
    const originalMeta = JSON.parse(packageText);
    const originalSize = JSON.stringify(originalMeta).length;
    const resultMeta = optimizePackageMeta(originalMeta);
    const resultSize = JSON.stringify(resultMeta).length;
    const optimization = originalSize - resultSize;
    console.log(optimization);
  });
});

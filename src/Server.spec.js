const { describe, it } = require('mocha');
const fetch = require('node-fetch');
const { expect } = require('chai');

const SERVER_URL = 'http://localhost:4578';

describe('Server functional test', () => {
  const moduleName = 'lodash';
  it(`get package meta`, async () => {
    const response = await fetch(`${SERVER_URL}/${moduleName}`);
    expect(response.ok).to.be.eql(true);
    const body = await response.json();
    expect(body.name).to.be.eql(moduleName);
  });
  it('audit call', async () => {
    const response = await fetch(`https://registry.npm.org/-/npm/v1/security/audits/quick`, {
      method: 'POST',
      body: {},
    });
    expect(response.ok).to.be.eql(true);
  });
  it('wrong url', async () => {
    const response = await fetch(`${SERVER_URL}/${moduleName}/grengkerngjegn`)
  })
});

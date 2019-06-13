const { optimizePackageMeta } = require('./MetaUtils');
const express = require('express');
const proxy = require('express-http-proxy');
const morgan = require('morgan');
const app = express();

app.use(morgan('tiny'));

app.use('/:moduleName', proxy('https://registry.npmjs.org', {
  proxyReqPathResolver: function() {

  },
  userResDecorator: function(proxyRes, proxyResData) {
    console.log(proxyResData.toString());
    const result = JSON.stringify(optimizePackageMeta(JSON.parse(proxyResData.toString())));
    console.log(result);
    return result;
  },
}));

app.use(proxy('registry.npm.org'));

app.listen(4578, (err) => {
  if (err) {
    console.log('Error during start');
    console.log(err);
    return;
  }
  console.log('Started');
});

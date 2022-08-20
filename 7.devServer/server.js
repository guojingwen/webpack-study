const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');

const app = express();
const compiler = webpack(config);
const middleware = webpackDevMiddleware(compiler);
app.use(middleware);

app.listen(9081, function () {
  console.log('webpack-dev-middlewares start by express on port 9081');
});

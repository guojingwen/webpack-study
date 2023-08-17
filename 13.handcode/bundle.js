// step1 单文件打包
/* const options = require("./step1/webpack.config.js");
const Webpack = require("./step1/myWebpack.js")
new Webpack(options).run(); */

const options = require("./step2/webpack.config.js");
const Webpack = require("./step2/myWebpack.js")
new Webpack(options).run();
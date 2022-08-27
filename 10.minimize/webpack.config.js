const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'none',
    // devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[contenthash:6].js',
    },
    optimization: {
        minimize: true,
        //  只有打开minimize， minimizer配置才有意义
        minimizer: [
          new TerserPlugin({
            parallel: true, // 使用多进程并发运行以提高构建速度
            extractComments: false, // 是否将注释丹徒
            terserOptions: {
              compress: {
                arguments: true,
                dead_code: true
              },
              mangle: true, //  非顶层变量 被混淆
              // 在 mangle: true 的前提下 配置toplevel: true 顶层变量被混淆 
              toplevel: true,
              keep_classnames: true, 
              keep_fnames: true
            }
          })
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'webpack 代码分割 runtime',
        }),
    ]
  }

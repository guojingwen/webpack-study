const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/index_usedExports.js',
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[contenthash:6].js',
    },
    optimization: {
        // usedExports: 目的是标注出来哪些函数是没有被使用 unused
        usedExports: true, // production
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true, // 使用多进程并发运行以提高构建速度
                extractComments: false, // 是否将注释
                terserOptions: {
                    compress: {
                        dead_code: true
                    },
                    mangle: false,
                }
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'webpack 代码分割 runtime',
        })
    ]
  }

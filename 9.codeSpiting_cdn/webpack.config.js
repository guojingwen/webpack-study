const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env) {
    const isProduction = env.production;
    process.env.NODE_ENV = isProduction ? 'production' : 'development';

    const externals = {};
    if (isProduction) {
        // window._
        externals.lodash = "_";
    }

    return {
        mode: process.env.NODE_ENV,
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.join(__dirname, './dist')
        },
        externals,
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './index.html',
                title: 'webpackp cdn',
            }),
        ]
    }
}
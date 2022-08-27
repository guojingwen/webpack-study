const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'none',
    // devtool: 'source-map',
    entry: './src/index_scope_hosting.js',
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[contenthash:6].js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'webpack 代码分割 runtime',
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ]
  }

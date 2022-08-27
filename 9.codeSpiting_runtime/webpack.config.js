const HtmlWebpackPlugin = require('html-webpack-plugin');
const {DefinePlugin} = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')

module.exports = {
    mode: 'none',
    // devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[contenthash:6].js',
        chunkFilename: "[name].[contenthash:6].chunk.js",
        publicPath: './'
    },
    optimization: {
        chunkIds: 'named',
        runtimeChunk: {
            name: function(entrypoint) {
                return `runtime-${entrypoint.name}`
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'webpack 代码分割 runtime',
        }),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify("development"),
        }),
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin,  [/runtime-.*.js/]),
    ]
  }

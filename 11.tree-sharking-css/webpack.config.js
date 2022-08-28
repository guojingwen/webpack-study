const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
const PurgeCssPlugin = require('purgecss-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: './src/index.js',
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
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    CssExtractPlugin.loader,
                    'css-loader',
                ],
                sideEffects: true,
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'webpack tree-sharking-css',
        }),
        new CssExtractPlugin({
            filename: "css/[name].[hash:8].css",
        }),
        new PurgeCssPlugin({
            paths: glob.sync(`${path.join(__dirname, "./src")}/**/*`, {nodir: true}),
            safelist: function() {
                return {
                    standard: ["html"]
                }
            }
        })
    ]
  }

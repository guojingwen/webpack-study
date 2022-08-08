const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'none',
    entry: "./src/index.js",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        // assetModuleFilename: 'img/[name].[chunkhash:6][ext]',
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.(je?pg|png|gif)$/i,
                type: 'asset',
                generator: {
                  filename: 'img/[name].[hash:6][ext]',
                //   outputPath: 'img'
                },
                parser: {
                  dataUrlCondition: {
                    maxSize: 100 * 1024,
                  }
                }
            },
            {
                test: /\.ttf|eot|woff2?$/i,
                type: "asset/resource",
                generator: {
                  filename: "font/[name].[hash:6][ext]",
                //   outputPath: 'font'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        // 1. 如果不配置template选项会使用该插件默认的模版
        new HtmlWebpackPlugin({
            title: 'webpack html 模版'
        }),
    ]
}
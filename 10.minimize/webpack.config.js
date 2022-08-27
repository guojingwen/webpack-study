const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const isProduction = true;

module.exports = {
    mode: 'none',
    // devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[contenthash:6].js',
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        }
      ]
    },
    optimization: {
        minimize: true,
        //  只有打开minimize， minimizer配置才有意义
        minimizer: [
          new TerserPlugin({
            parallel: true, // 使用多进程并发运行以提高构建速度
            extractComments: false, // 是否将注释移除
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
        // new HtmlWebpackPlugin({
        //     template: './index.html',
        //     title: 'webpack 代码压缩',
        // }),
        new HtmlWebpackPlugin({
          template: "./index.html",
          title: 'webpack 代码压缩',
          // inject: "body"
          cache: true, // 当文件没有发生任何改变时, 直接使用之前的缓存
          minify: isProduction ? {
            removeComments: true, // 是否要移除html中注释
            // 是否移除多余的属性
            // <input type="text">   type 默认值就是 text  --> <input>
            removeRedundantAttributes: true,
            // 是否移除一些空属性
            removeEmptyAttributes: true,
            // 移除空格
            collapseWhitespace: false,
            // 移除style标签中的多余属性
            // <link rel="stylesheet" type="text/css" href="" /> -> <link rel="stylesheet" href="" />
            removeStyleLinkTypeAttributes: true,
            // 压缩css
            minifyCSS: true,
            // 压缩js
            // minifyJS: true,
            minifyJS: {
              mangle: { // 这里的配置同 terser-webpack-plugin
                toplevel: false
              }
            }
          }: false
        }),
        new MiniCssExtractPlugin({
          filename: "css/[name].[hash:8].css",
        }),
        new CSSMinimizerPlugin({
          parallel: true,
        }),
        new CompressionWebpackPlugin({
          test: /\.(css|js)$/, // 匹配哪些文件需要压缩
          threshold: 500, // 设置文件从多大开始压缩
          minRatio: 0.7, // 至少的压缩比例
          algorithm: 'gzip', // 采用的压缩算法
          // include: 
          // exclude:
        })
    ]
  }

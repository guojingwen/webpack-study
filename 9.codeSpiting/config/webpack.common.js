/* eslint-disable */
const {merge} = require('webpack-merge');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const resolveApp = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {DefinePlugin} = require('webpack');

function getCommonConfig(isProduction) {
  return {
    // 多入口打包 也是属于一种代码分割
    // 注意多入口打包要修改 output.filename的 值为 "[name].bundle.js"
    entry: {
      pageA: "./src/pageA.ts",
      pageB: "./src/pageB.ts"
    },
    // 1. 抽离公共的lodash
    // entry: {
    //   pageA: {
    //     import: "./src/pageA.ts",
    //     dependOn: 'lodash'
    //   },
    //   pageB: {
    //     import: "./src/pageB.ts",
    //     dependOn: 'lodash'
    //   },
    //   lodash: 'lodash'
    // },
    // 2. 抽离公共包 loadsh dayjs
    // entry: {
    //   pageA: {
    //     import: "./src/pageA.ts",
    //     dependOn: ['lodash', 'dayjs']
    //   },
    //   pageB: {
    //     import: "./src/pageB.ts",
    //     dependOn: ['lodash', 'dayjs']
    //   },
    //   lodash: 'lodash',
    //   dayjs: 'dayjs'
    // },
    // 前面的方案会打出 两个公共文件 loadsh.bundle.js dayjs.bundle.js
    // 3. 抽离公共包， 多包合并
    // entry: {
    //   pageA: {
    //     import: "./src/pageA.ts",
    //     dependOn: 'shared'
    //   },
    //   pageB: {
    //     import: "./src/pageB.ts",
    //     dependOn: 'shared'
    //   },
    //   shared: ['lodash', 'dayjs'],
    // },
    optimization: {
      splitChunks: {
        // async 异步 initial同步 all同步+异步
        chunks: 'initial',
        // 
        minSize: 20000,
        // maxSize: 20000, // 优先级 minSize > maxSize
        // minSize: 2000,
        // maxSize: 2000,
        
        // 至少被引入几次才参与代码分割
        minChunks: 1,
        cacheGroups: {
          venders: {
            test: /[\\/]node_modules[\\/]/,
            filename: "[id]_venders.js",
            priority: -10
          },
          // aa: {
          //   test: /aa_/,
          //   filename: "[id]_aa.js",
          //   // name: "aa.js"
          // },
          default: {
            minChunks: 1,
            filename: "common_[id].js",
            priority: -20
          }
        }
      },
      chunkIds: 'named',
      // runtimeChunk: true, // true/multiple：针对每个入口打包一个runtime文件
      // single：打包一个runtime文件；
      // runtimeChunk: 'single',
    },
    output: {
      path: resolveApp('./dist'),
      filename: "[name]-[contenthash:6].bundle.js",
      chunkFilename: "[name].[contenthash:6].chunk.js"
    },
    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.ts', '.vue'],
      alias: {
        '@': resolveApp('./src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.s?css/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(js|ts|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        title: 'webpackp 环境分离',
        versionInfo: new Date().toLocaleString(),
      }),
      new DefinePlugin({
        BASE_URL: JSON.stringify('./'),
        'process.env.NODE_ENV': JSON.stringify(isProduction ? "production": "development"),
      }),
      // new ScriptExtHtmlWebpackPlugin({
      //   inline: /runtime~.+\.js$/  //正则匹配runtime文件名
      // }),
    ]
  }
}

module.exports = function (env) {
  const isProduction = env.production;
  process.env.NODE_ENV = isProduction ? "production": "development";
  const config = isProduction ? prodConfig : devConfig;

  return merge(getCommonConfig(isProduction), config);
};
/* eslint-enable */

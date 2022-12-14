/* eslint-disable */
const {merge} = require('webpack-merge');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const resolveApp = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {DefinePlugin, ProvidePlugin} = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtrctPlugin = require('mini-css-extract-plugin');


function getCommonConfig(isProduction) {
  const plugins = [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'webpackp 环境分离',
      versionInfo: new Date().toLocaleString(),
    }),
    new DefinePlugin({
      BASE_URL: JSON.stringify('./'),
      'process.env.NODE_ENV': JSON.stringify(isProduction ? "production": "development"),
    }),
    new VueLoaderPlugin(),
    // 当在代码中遇到某一个变量找不到时, 我们会通过ProvidePlugin, 自动导入对应的库
    new ProvidePlugin({
      axios: "axios",
      get: ["axios", "get"]
    })
  ];
  if(isProduction) {
    plugins.push(new MiniCssExtrctPlugin({
      filename: "css/[name].[hash:8].css",
      // chunkFilename: "css/[name].[hash:8].css",
    }))
  }
  return {
    entry: './src/index.ts',
    output: {
      filename: 'bundle.js',
      path: resolveApp('./dist'),
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
            isProduction? MiniCssExtrctPlugin.loader : 'style-loader',
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
        {
          test: /\.(je?pg|png|gif)$/i,
          type: 'asset',
          generator: {
            filename: 'img/[name].[hash:6][ext]',
          },
          parser: {
            dataUrlCondition: {
              maxSize: 50 * 1024,
            },
          },
        },
        {
          test: /\.ttf|eot|woff2?$/i,
          type: 'asset/resource',
          generator: {
            filename: 'font/[name].[hash:6][ext]',
          },
        },
        {
          test: /\.vue$/,
          use: 'vue-loader'
        }
      ],
    },
    plugins
  }
}

module.exports = function (env) {
  console.log(env);
  const isProduction = env.production;
  process.env.NODE_ENV = isProduction ? "production": "development";
  const config = isProduction ? prodConfig : devConfig;

  return merge(getCommonConfig(isProduction), config);
};
/* eslint-enable */

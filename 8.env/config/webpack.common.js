/* eslint-disable */
const {merge} = require('webpack-merge');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const resolveApp = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {DefinePlugin} = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


function getCommonConfig(isProduction) {
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
      new VueLoaderPlugin(),
    ]
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

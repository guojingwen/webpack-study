/* eslint-disable */
const {merge} = require('webpack-merge');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const resolveApp = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {DefinePlugin} = require('webpack');

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

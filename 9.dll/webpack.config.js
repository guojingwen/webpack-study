/* eslint-disable */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {DefinePlugin} = require('webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

function getCommonConfig(isProduction) {
  const plugins = [
    // new HtmlWebpackPlugin({
    //   template: './index.html',
    //   title: 'webpackp 环境分离',
    //   versionInfo: new Date().toLocaleString(),
    // }),
    new DefinePlugin({
      BASE_URL: JSON.stringify('./'),
      'process.env.NODE_ENV': JSON.stringify(isProduction ? "production": "development"),
    }),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, "./dll"),
      manifest: path.join(__dirname, "./dll/react.manifest.json")
    }),
    new AddAssetHtmlPlugin({
      filepath: path.join(__dirname, './dll/dll_react.js')
    })
    // new HardSourceWebpackPlugin(),
  ];
  if(!isProduction) {
    plugins.push(new ReactRefreshPlugin())
  } else {
    plugins.push(new CleanWebpackPlugin())
  }
  return {
    mode: process.env.NODE_ENV,
    entry: './src/loadReact.jsx',
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, './dist'),
    },
    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
    plugins
  }
}

module.exports = function (env) {
  const isProduction = env.production;
  process.env.NODE_ENV = isProduction ? "production": "development";

  return getCommonConfig(isProduction);
};
/* eslint-enable */

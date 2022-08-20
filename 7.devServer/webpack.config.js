/* eslint-disable */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');
const path = require('path');

module.exports = {
  mode: 'none',
  devtool: 'cheap-module-source-map',
  devServer: {
    // contentBase: './build',
    port: 9081
  },
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './dist'),
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.ts', '.vue'],
    alias: {
      '@': path.resolve(__dirname, './src'),
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
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(je?pg|png|gif)$/i,
        // webpack5 不再需要file-loader url-loader raw-loader
        // 它内置了 资源模块类型 asset module type
        type: 'asset',
        generator: {
          // 也可以配置 output.assetModuleFilename: 'img/[name].[chunkhash:6][ext]'
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
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'webpackp配置babel/ts/eslint',
      versionInfo: new Date().toLocaleString(), // 发布标注
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/.DS_Store', '**/index.html'],
          },
        },
      ],
    }),
    new DefinePlugin({
      BASE_URL: JSON.stringify('./'),
      // 'process.node.ENV'
    }),
  ],
};
/* eslint-enable */

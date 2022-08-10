const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {DefinePlugin} = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: "./src/js/index.js",
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './dist'),
  },
  module: {
    rules: [
      {
          test: /\.css$/,
          use: [
              { loader: 'style-loader' },
              { loader: 'css-loader' },
          ]
      },
      { // 该loader仅用于对比cheap-source-map与cheap-module-source-map
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '自定义标题',
      template: './public/index.html'
    }),
    new DefinePlugin({
      BASE_URL: '"./"'
    }),
    new CopyWebpackPlugin({
        patterns: [
            {
                from: 'public',
                globOptions: {
                    ignore: [
                        "**/.DS_Store",
                        "**/index.html"
                    ]
                }
            }
        ]
    })
  ]
}
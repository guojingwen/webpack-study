/* eslint-disable */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    // webpack-dev-server v4 相对于v3发生很大改变
    // https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md
    port: 9081,
    hot: false, // false true 'only'
    // hotOnly: true, // v4 请使用 hot: 'only'
    devMiddleware: {
      // publicPath: '/abc',
    },
    // contentBase 已废弃， 请使用 static.directory
    static: {
      directory: path.join(__dirname, 'lib'),
    },
    host: '127.0.0.1',
    compress: false,
    historyApiFallback: true,
    // historyApiFallback: {
    //   rewrites: [
    //     {from: /abc/, to: "/index.html"}
    //   ]
    // }
    proxy: {
      // "/api": "http://localhost:8080",
      "/api": {
        target: "http://localhost:8080",
        pathRewrite: {
          "^/api": ""
        },
      }
    }
  },
  entry: './src/index.ts',
  // entry: './src/react-router-index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './dist'),
    // publicPath: '/abc'
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
        test: /\.(js|ts|jsx)$/,
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
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
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
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),

    new VueLoaderPlugin(),
    new ReactRefreshPlugin(),
  ],
};
/* eslint-enable */

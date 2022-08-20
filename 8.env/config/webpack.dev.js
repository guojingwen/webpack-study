const resolveApp = require('./paths');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 9081,
    hot: 'only',
    static: {
      directory: resolveApp(__dirname, 'lib'),
    },
    host: '127.0.0.1',
    compress: false,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  plugins: [new ReactRefreshPlugin()],
};

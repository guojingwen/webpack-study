const resolveApp = require('./paths');

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
  },
};

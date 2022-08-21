const presets = [
  '@babel/preset-react',
];
const plugins = [];

if (process.env.NODE_ENV === 'development') {
  plugins.push('react-refresh/babel');
}

module.exports = {
  presets,
  plugins,
};

const presets = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'usage',
      corejs: {
        version: '3.24.1',
        proposals: true,
      },
    },
  ],
  '@babel/preset-react',
  '@babel/preset-typescript',
];
const plugins = ['@babel/plugin-transform-runtime'];

if (process.env.NODE_ENV === 'development') {
  plugins.push('react-refresh/babel');
}

module.exports = {
  presets,
  plugins,
};

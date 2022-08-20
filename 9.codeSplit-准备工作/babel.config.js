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
  '@babel/preset-typescript',
];
const plugins = ['@babel/plugin-transform-runtime'];

module.exports = {
  presets,
  plugins,
};

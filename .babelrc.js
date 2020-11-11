module.exports = {
  presets: [['@babel/preset-env', { useBuiltIns: 'usage', corejs: { version: 3, proposals: true } }], '@babel/preset-react'],
  plugins: [['@babel/plugin-transform-runtime', {}], ['@babel/plugin-proposal-class-properties']],
};

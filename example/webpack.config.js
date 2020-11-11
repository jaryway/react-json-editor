process.env.BABEL_ENV = 'development';
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
// process.env.NODE_ENV = 'production';

// const fs = require("fs");
// const path = require("path");
// console.log('xxxx', __dirname);

module.exports = {
  mode: process.env.BABEL_ENV,
  entry: './example/index.js',
  output: {
    filename: 'main.js',
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: './example/public',
    port: 5200,
    host: '192.10.170.111',
    open: true,
    // quiet: true,
    hot: true,
    // proxy: {
    //   '/his-omp/api': {
    //     target: 'http://192.10.169.212:31111/',
    //     pathRewrite: { '^/his-omp/api': '' },
    //   },
    //   '/his-omp/api': {
    //     target: 'http://192.10.169.212:31111/',
    //     pathRewrite: { '^/his-omp/api': '' },
    //   },
    // },
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, '../src'),path.resolve(__dirname, '../json-editor')],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      'api': path.join(__dirname, '../example/api/index.fly.js'),
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        enforce: 'pre',
        include: [resolveApp('src'), resolveApp('example')],
        use: [
          {
            loader: require.resolve('eslint-loader'),
            options: {
              eslintPath: require.resolve('eslint'),
              resolvePluginsRelativeTo: __dirname,
            },
          },
        ],
      },

      {
        oneOf: [
          {
            test: /\.less$/,
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            use: [
              { loader: 'style-loader' },
              { loader: 'css-loader' },
              {
                loader: 'less-loader',
                options: {
                  noIeCompat: true,
                  javascriptEnabled: true,
                },
              },
            ],
          },
          {
            test: /\.css/,
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
          },
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  { useBuiltIns: 'usage', corejs: { version: 3, proposals: true } },
                ],
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
              plugins: [
                ['@babel/plugin-transform-typescript', { allowNamespaces: true }],
                ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }, 'ant'],
                [
                  'import',
                  { libraryName: 'fregata', libraryDirectory: 'es', style: true },
                  'fregata',
                ],
              ],
              cacheDirectory: true,
            },
          },
          {
            test: /\.(js|mjs|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  { useBuiltIns: 'usage', corejs: { version: 3, proposals: true } },
                ],
                '@babel/preset-react',
              ],
              plugins: [
                ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: 'css' }, 'ant'],
                [
                  'import',
                  { libraryName: 'fregata', libraryDirectory: 'lib', style: true },
                  'fregata',
                ],
              ],
              cacheDirectory: true,
            },
          },
          {
            test: /\.svg$/,
            exclude: [/node_modules/, /fonts/],
            use: [
              {
                loader: require.resolve('babel-loader'),
                // 这个要加，不然 @svgr/webpack和 url-loader 一起用报错
                options: {
                  // This is a feature of `babel-loader` for webpack (not Babel itself).
                  // It enables caching results in ./node_modules/.cache/babel-loader/
                  // directory for faster rebuilds.
                  cacheDirectory: true,
                  // cacheCompression: isEnvProduction,
                  // compact: isEnvProduction,
                },
              },
              {
                loader: require.resolve('@svgr/webpack'),
                options: { babel: false },
              },
              {
                loader: require.resolve('url-loader'),
                options: {
                  limit: 1000,
                  name: `static/media/[name].[hash:8].[ext]`,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './example/public/index.html',
    }),
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
    }),
  ],
  externals: {
    'ace': 'ace',
    // 'api': 'api',
    'react-router-dom': {
      root: 'ReactRouterDOM',
      commonjs2: 'react-router-dom',
      commonjs: 'react-router-dom',
      amd: 'react-router-dom',
    },
  },
  performance: false,
};

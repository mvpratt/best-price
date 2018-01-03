const webpack = require('webpack');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

const config = {
  entry: { app: ['whatwg-fetch', `${SRC_DIR}/app/index.js`] },

  output: {
    path: `${DIST_DIR}/app`,
    filename: 'bundle.js',
    publicPath: '/app/',
  },
  module: {
    loaders: [
      {
        test: /\.js?/,
        include: SRC_DIR,
        // exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'stage-2', 'es2015'],
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = config;

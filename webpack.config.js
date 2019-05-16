const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env = {}) => {
  return {
    context: path.resolve(__dirname, '.'),

    devtool: 'hidden-source-map',

    entry: [path.join(__dirname, 'index.js')],

    mode: 'production',

    module: {
      rules: [
        {
          exclude: /node_modules/,
          loader: 'babel-loader',
          test: /\.js$/,
        },
      ],
    },

    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, './dist/'),
      sourceMapFilename: '[file].sentry.map',
    },

    plugins: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true,
        terserOptions: {
          ecma: 5,
        },
      }),

      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map',
        noSources: true,
      }),
    ],

    resolve: {
      extensions: ['.js'],
    },
  };
};

const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env = {}) => {
  return {
    context: path.resolve(__dirname, '.'),

    devtool: 'hidden-source-map',

    entry: [path.join(__dirname, 'index.js')],

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
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          ecma: 8,
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

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

let FlexLoading;
if (process.env.NODE_ENV === 'from_source') {
  FlexLoading = path.resolve(__dirname, '../src/index.js');
} else {
  FlexLoading = 'react-loading-signal';
  // throw new Error('no NODE_ENV');
}
const outDir = path.resolve(__dirname, process.env.NODE_ENV);
if (fs.existsSync(outDir)) {
  require('rimraf').sync(outDir);
}

module.exports = {
  bail: true, // exit when error;
  output: {
    filename: '[name].js',
    path: outDir,
  },
  entry: {
    both: './both.js',
    container: './container.js',
    global: './global.js',
    local: './local.js',
    multiple: './multiple.js',
    progress: './progress.js',
    theme: './theme.js',
  },
  context: path.resolve(__dirname, 'src'),
  resolve: {
    alias: {
      FlexLoading: FlexLoading,
    },
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
            options: {
              emitErrors: true,
              failOnError: true, // fail when error;
            },
          },
        ],
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
              sourceMap: true,
              localIdentName: '[name]__[local]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.gif/,
        loader: 'url-loader',
      },
    ],
  },
};

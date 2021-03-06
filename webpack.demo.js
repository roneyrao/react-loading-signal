// development specific configs;
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outDir = path.resolve(__dirname, 'demo_built');
let development = {
  entry: ['raf/polyfill', 'babel-polyfill', './index.js'],
  context: path.resolve(__dirname, 'demo'),
  devtool: 'cheap-module-source-map',
  output: {
    path: outDir,
  },
  resolve: {
    alias: {
      FlexLoading: path.resolve(__dirname, 'src/'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
};

// webpack-dev-server specific configs;
if (path.basename(require.main.filename) === 'webpack-dev-server.js') {
  development = merge(development, {
    plugins: [
      // for easy identifying recompiling;
      function newCompile() {
        this.plugin('done', () => {
          console.log(`\n[${new Date().toLocaleString()}] ______Start a new compilation______\n`);
        });
      },
    ],
    devServer: {
      disableHostCheck: true,
      contentBase: path.resolve(__dirname, outDir),
      open: true,
    },
  });
}

if (process.env.NODE_ENV === 'production') {
  development.plugins.push(new webpack.optimize.UglifyJsPlugin({
    drop_console: true,
    sourceMap: true,
  }));
}

module.exports = development;

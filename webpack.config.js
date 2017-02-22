var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './test/e2e/index.tsx',
  output: {
    path: 'dist',
    filename: 'index_bundle.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx', 'json']
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.json$/, loader: 'json-loader'},
      { test: /\.ts(x?)$/, loader: 'ts-loader' }
    ]
  },
  plugins: [new HtmlWebpackPlugin()]
};

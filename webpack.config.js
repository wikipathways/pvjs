var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

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
<<<<<<< HEAD
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        { test: /\.json$/, loader: 'json-loader'},
        { test: /\.ts(x?)$/, loader: 'ts-loader' },
        {
            test: /\.(ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&name=assets/fonts/[name].[hash].[ext]"
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&name=assets/images/[name].[hash].[ext]"
        }
=======
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.json$/, loader: 'json-loader'},
      { test: /\.ts(x?)$/, loader: 'ts-loader' },
      {
          test: /\.(ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader?limit=10000&name=assets/fonts/[name].[hash].[ext]"
      },
      {
          test: /\.(png|jpe?g|gif|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader?limit=10000&name=assets/images/[name].[hash].[ext]"
      },
      /* TODO can we get rid of this in favor of url-loader?
      {
          test: /\.svg$/i,
          loaders: [
            'image-webpack?bypassOnDebug',
            'svg-url-loader?noquotes'
          ]
      }
      //*/
>>>>>>> bd6bf6f8b5551ba02504a63326aa69690c06788d
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery',
        Tether: 'tether',
        "window.Tether": "tether",
        Tooltip: "exports?Tooltip!bootstrap/js/dist/tooltip",
        Alert: "exports?Alert!bootstrap/js/dist/alert",
        Button: "exports?Button!bootstrap/js/dist/button",
        Carousel: "exports?Carousel!bootstrap/js/dist/carousel",
        Collapse: "exports?Collapse!bootstrap/js/dist/collapse",
        Dropdown: "exports?Dropdown!bootstrap/js/dist/dropdown",
        Modal: "exports?Modal!bootstrap/js/dist/modal",
        Popover: "exports?Popover!bootstrap/js/dist/popover",
        Scrollspy: "exports?Scrollspy!bootstrap/js/dist/scrollspy",
        Tab: "exports?Tab!bootstrap/js/dist/tab",
        Util: "exports?Util!bootstrap/js/dist/util"
    })
  ]
};

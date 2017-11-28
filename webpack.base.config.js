const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StringReplacePlugin = require("string-replace-webpack-plugin");

const babelLoader = {
  loader: "babel-loader",
  options: {
    presets: [
      [
        "env",
        {
          targets: {
            node: "5.10",
            browsers: ["last 2 versions", "ie >= 10"]
          }
        }
      ],
      "react"
    ]
  }
};

const shebangRemovalLoader = {
  loader: StringReplacePlugin.replace({
    replacements: [
      {
        pattern: /^#!.*$/m,
        replacement: function(match, p1, offset, string) {
          return "";
        }
      }
    ]
  })
};

module.exports = {
  context: path.resolve(__dirname),
  resolve: {
    extensions: [".webpack.js", ".web.js", ".js", ".jsx", ".json"]
  },
  module: {
    rules: [
      /*
      // Create an external stylesheet rather than inlined to support Angular CLI users
      // In Angular CLI, all styles must be specified in the styles property of a component
      // See: https://github.com/angular/angular-cli/issues/1459
      // Note: the typestyles will still be imported fine since they are not css files
      // Angular CLI users should add 'dist/style.css' into their component styles
      // TODO: Add an example of this in the README
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader", "postcss-loader"]
        })
      },
      //*/
      /*
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      },
      //*/
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, "lib"),
          path.resolve(__dirname, "node_modules/kaavio")
        ],
        use: [{ loader: "to-string-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: "json-loader"
      },
      {
        test: /\.jsx?$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.jsx?$/,
        //*
        include: [
          path.resolve(__dirname, "lib"),
          // NOTE: we need to run any modules published as esnext through Babel.
          // Specifying which paths to include tells Babel to only transpile what
          // is specified instead of transpiling everything. This speeds up the
          // compilation.
          path.resolve(__dirname, "node_modules/kaavio"),
          path.resolve(__dirname, "node_modules/color-interpolate"),
          path.resolve(__dirname, "node_modules/fs-extra"),
          path.resolve(__dirname, "node_modules/universalify"),
          path.resolve(__dirname, "node_modules/url-regex")
        ],
        use: [babelLoader, shebangRemovalLoader]
      }
    ]
  },
  plugins: [
    /*
    new ExtractTextPlugin({
      filename: "style.css",
      allChunks: true
    })
  //*/
  ]
};

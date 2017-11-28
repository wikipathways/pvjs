const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");

const webpackConfig = require("./webpack.base.config");

webpackConfig.entry = path.resolve(__dirname, "lib/browser.js");
webpackConfig.output = {
  path: path.resolve(__dirname, "dist"),
  filename: "pvjs.js",
  library: "pvjs",
  libraryTarget: "umd"
};

webpackConfig.devtool = "source-map";
webpackConfig.module.rules.push({
  test: require.resolve("react-dom"),
  use: [
    {
      loader: "expose-loader",
      options: "ReactDOM"
    }
  ]
});

[
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify("production")
  }),
  new UglifyJsPlugin({
    sourceMap: false,
    beautify: false,
    ecma: "8",
    mangle: {
      screw_ie8: true,
      keep_fnames: true
    },
    compress: {
      screw_ie8: true
    },
    comments: false
  })
].forEach(function(plugin) {
  webpackConfig.plugins.unshift(plugin);
});

module.exports = webpackConfig;

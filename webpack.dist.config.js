const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const webpackConfig = require("./webpack.base.config");

const babelLoader = {
  loader: "babel-loader",
  options: {
    presets: [
      [
        "env",
        {
          targets: {
            node: "current",
            browsers: ["last 2 versions", "ie >= 10"]
          }
        }
      ],
      "react"
    ]
  }
};
webpackConfig.module.rules
  .filter(
    ({ test }) =>
      ["/\\.tsx?/", "/\\.jsx?$/", "/\\.[jt]sx?$/"].indexOf(test.toString()) > -1
  )
  .forEach(rule => rule.use.push(babelLoader));

webpackConfig.devtool = "source-map";

[
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify("production")
  }),
  new UglifyJsPlugin({
    sourceMap: true,
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
  webpackConfig.plugins.push(plugin);
});

module.exports = webpackConfig;

const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const webpackConfig = require("./webpack.base.config");

const MODE = "production";

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
webpackConfig.optimization = {
  minimizer: [
    new UglifyJsPlugin({
      sourceMap: true
    })
  ]
};

webpackConfig.mode = MODE;

[
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(MODE)
  })
].forEach(function(plugin) {
  webpackConfig.plugins.push(plugin);
});

module.exports = webpackConfig;

const _ = require("lodash");
const path = require("path");
const webpack = require("webpack");

const webpackConfig = require("./webpack.base.config");

webpackConfig.entry = path.resolve(__dirname, "lib/cli.js");
webpackConfig.output = {
  path: path.resolve(__dirname, "dist"),
  filename: "cli.js",
  libraryTarget: "commonjs2"
  //library: "Pvjs",
  //libraryTarget: "umd"
};
webpackConfig.target = "node";
webpackConfig.node = {
  __dirname: false
};
webpackConfig.devtool = "cheap-module-eval-source-map";

[
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify("dev")
  }),
  new webpack.BannerPlugin({
    banner: "require('source-map-support').install();",
    //entryOnly: true,
    raw: true
  })
].forEach(function(plugin) {
  webpackConfig.plugins.push(plugin);
});

module.exports = webpackConfig;

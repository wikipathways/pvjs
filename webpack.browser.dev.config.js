const path = require("path");
const webpack = require("webpack");

const webpackConfig = require("./webpack.base.config");

webpackConfig.entry = {
  cli: "./esnext/cli.js",
  "Pvjs.vanilla": "./esnext/browser.js",
  Pvjs: "./esnext/Pvjs.js",
  jQueryPvjsPlugin: "./esnext/jQueryPvjsPlugin.js"
};
webpackConfig.output = {
  filename: "[name].js",
  path: path.resolve(__dirname, "dist"),
  library: "[name]",
  libraryTarget: "umd"
};

webpackConfig.devtool = "cheap-module-eval-source-map";
webpackConfig.devServer = {
  contentBase: [
    path.join(__dirname, "test"),
    path.join(__dirname, "dist"),
    path.join(__dirname, "node_modules/gpml2pvjson/test/expected")
  ],
  //compress: true,
  port: 9000
};

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
    "process.env.NODE_ENV": JSON.stringify("dev")
  })
].forEach(function(plugin) {
  webpackConfig.plugins.push(plugin);
});

module.exports = webpackConfig;

const path = require("path");
const webpack = require("webpack");

const webpackConfig = require("./webpack.base.config");

webpackConfig.entry = path.resolve(__dirname, "lib/browser.js");
webpackConfig.output = {
  path: path.resolve(__dirname, "dist"),
  filename: "pvjs.js",
  library: "pvjs",
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

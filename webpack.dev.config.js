const path = require("path");
const webpack = require("webpack");
const webpackConfig = require("./webpack.base.config");
const npmPkg = require("./package.json");

webpackConfig.output.path = path.resolve(__dirname, "test");

const numericIdentifier = Math.abs(
  (!!npmPkg && !!npmPkg.name ? npmPkg.name : __dirname)
    .split("")
    .reduce((acc, char, i) => acc + (i + 27) * (char.codePointAt(0) - 97), 0) +
    1025
);
const port = Math.min(65336, numericIdentifier);

webpackConfig.devtool = "cheap-module-eval-source-map";
webpackConfig.devServer = {
  contentBase: [
    path.join(__dirname, "test"),
    path.join(__dirname, "node_modules/gpml2pvjson/test/expected"),
    path.join(__dirname, "node_modules/@wikipathways/gpml/test/2013a")
  ],
  port: port
};

[
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify("dev")
  })
].forEach(function(plugin) {
  webpackConfig.plugins.push(plugin);
});

module.exports = webpackConfig;

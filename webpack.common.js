const webpack = require("webpack");
const WebpackNotifierPlugin = require("webpack-notifier");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: `/public/_js/main.js`,
  output: {
    path: `${__dirname}/public/js`,
    filename: "main.js",
  },
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
    new WebpackNotifierPlugin({
      alwaysNotify: true,
    }),
  ],
}

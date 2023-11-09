const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  // entry: {
  //   index: "./src/index.js",
  //   print: "./src/about/print.js",
  // },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.mp3$/i,

        type: "asset/resource",
        generator: {
          filename: "audio/[name].[hash].[ext]",
        },
      },
    ],
  },
};

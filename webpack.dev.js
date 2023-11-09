const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  entry: {
    index: { import: "./src/index.js", filename: "./js/[name].js" },
    print: {
      import: "./src/about/print.js",
      filename: "./js/about/[name].js",
    },
  },
  output: {
    clean: true,
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./src",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
      chunks: ["index"],
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/about/about.html",
      inject: true,
      chunks: ["print"],
      filename: "./html/about/about.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
});

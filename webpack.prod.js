const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const link = "about/about.[contenthash].html";

module.exports = merge(common, {
  mode: "production",
  entry: {
    index: {
      import: "./src/index.js",
      filename: "./js/[name]-[contenthash].js",
    },
    print: {
      import: "./src/about/print.js",
      filename: "./js/about/[name]-[contenthash].js",
    },
  },
  output: {
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "./css/style.[contenthash].css" }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      `...`,
      new CssMinimizerPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/about/about.html",
        inject: true,
        chunks: ["print"],
        filename: "html/about/about.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        inject: true,
        chunks: ["index"],
        filename: "index.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
    ],
  },
});

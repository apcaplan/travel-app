const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/client/index.js',
  mode: 'production',
  devtool: "source-map",
  module: {
    rules: [{
      test: "/.js$/",
      exclude: /node_modules/,
      loader: "babel-loader",
    }]
  },
  output: {
  libraryTarget: "var",
  library: "Client",
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    })
  ]
}
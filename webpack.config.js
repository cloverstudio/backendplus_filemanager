const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')

const baseURL = "./";

module.exports = {
  entry: { 
    index: ['babel-polyfill', './frontend/src/index.js'] 
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: baseURL,
  },
  plugins: [
    new CleanWebpackPlugin([
      path.resolve(__dirname, 'public')
    ]),
    new HtmlWebpackPlugin({
      template: "frontend/index.tpl.html",
      inject: "body",
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      { test: /\.html$/, use: 'html-loader' },
      {
        test: /\.scss|\.css$/,
        use: [
            // fallback to style-loader in development
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
        ]
    }
    ]
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react')
    }
  }
};
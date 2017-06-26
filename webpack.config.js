const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [require.resolve('babel-preset-es2015'), { module: false}],
            require.resolve('babel-preset-react'),
            require.resolve('babel-preset-stage-1')
          ],
          plugins: [
            require.resolve('react-hot-loader/babel')
          ]
        }
      },
      {
        test: /\.scss$/,
     use: ExtractTextPlugin.extract({
       fallback: "style-loader",
               use: "css-loader",
        publicPath: "/dist"
       })

      }
    ]
  },
  entry: [
    './src/main.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'  
  },
  plugins: [
   new ExtractTextPlugin('style.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs'
    })
  ],
  devServer: {
    contentBase: path.join(process.cwd(), 'dist'),
    inline: true,
    port:7777
  },
};
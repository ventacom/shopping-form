const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const webpack = require('webpack');

module.exports = {
    entry: './src/js/main.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'script.js'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader']
          })
        },
        {
          test: /\.(svg|gif|png|eot|woff|ttf)$/,
          use: [
            'url-loader'
          ]
        }
      ]
    },
    devServer: {
      watchOptions: {
        // Delay the rebuild after the first change
        aggregateTimeout: 300,
  
        // Poll using interval (in ms, accepts boolean too)
        poll: 1000,
      },
    },
    plugins: [
      new ExtractTextPlugin('style.css'),
      new webpack.WatchIgnorePlugin([
        path.join(__dirname, "node_modules")
      ])
    ]
  };
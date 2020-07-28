const webpack = require('webpack');
const { resolve, join } = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var config = {
  entry: './src/main.js',
  output: {
    path: resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '/',
          },
        },
        // 'style-loader',
        'css-loader'
      ]
    },
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }]
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html'
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
  })]
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
    config.target = "web";
    /** webpack-dev-server configuration */
    config.devServer = {
      publicPath: '/',
      contentBase: join(__dirname, './dist'),
      watchContentBase: true,
      compress: true
    }
  } else if (argv.mode === 'production') {

  }

  return config;
};


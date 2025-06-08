const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

// Call dotenv and it will return an Object with a parsed key 
const env = dotenv.config().parsed || {};
// Reduce it to a nice object
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

// Fallback environment variables if .env is not available
const fallbackEnv = {
  'process.env.REACT_APP_API_URL': JSON.stringify('http://localhost:8000/api'),
  'process.env.REACT_APP_GOOGLE_CLIENT_ID': JSON.stringify('your-google-client-id'),
  'process.env.REACT_APP_JWT_SECRET': JSON.stringify('skill-india-secret-key')
};

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.DefinePlugin(Object.keys(envKeys).length ? envKeys : fallbackEnv)
  ],
  devServer: {
    historyApiFallback: true,
    port: 3000,
    open: true
  }
}; 
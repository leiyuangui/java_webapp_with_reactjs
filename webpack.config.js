var webpack = require('webpack')
var path = require('path')
var package = require('./package.json')

const merge = require('webpack-merge');
const TARGET = process.env.npm_lifecycle_event;


const common = {
  entry: {
    app: './src/main/jsx/index.jsx'
  },
  mode: 'development',
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'target/' + package.name + '/assets'),
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devServer: {
            port: 9090,
            proxy: {
                '/': {
                    target: 'http://localhost:8080/',
                    secure: false,
                    prependPath: false
                }
            },
            publicPath: 'http://localhost:9090/assets/',
            historyApiFallback: true
        },
        devtool: 'source-map'
    });
}

if (TARGET === 'build') {
    module.exports = merge(common, {});
}

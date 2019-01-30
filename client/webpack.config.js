var path    = require('path');
var hwp     = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, '/dist')
    },
    module:{
        rules:[{
            exclude: /node_modules/,
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                     presets: ['es2015','stage-2']
                 }
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
    test: /\.(png|jpe?g|gif|svg)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          // path where the images will be saved
          name: 'assets/img/[name].[ext]'
        }
      },
      {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            quality: 65
          },
          pngquant:{
            quality: "10-20",
            speed: 4
          },
          svgo:{
            plugins: [
              {
                removeViewBox: false
              },
              {
                removeEmptyAttrs: false
              }
            ]
          },
          gifsicle: {
            optimizationLevel: 7,
            interlaced: false
          },
          optipng: {
            optimizationLevel: 7,
            interlaced: false
          }
        }
      }
    ]
  }]},
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        headers: {"Access-Control-Allow-Origin": " https://safe-shore-36860.herokuapp.com",
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS'},
        compress: true,
        port: 8000,
        proxy: {
            '/api': {
                target: 'http://localhost:9000',
                //target: 'https://quernus.serveo.net',
                secure: false,
                changeOrigin: true
              }
        },
        historyApiFallback: true
    },
    plugins:[
        new hwp({template:path.join(__dirname, '/src/index.html')})
    ]
}

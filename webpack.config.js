const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin')

module.exports = {
  entry: {
    main: path.join(process.cwd(), 'src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Transform all .js files required somewhere with Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        // Preprocess our own .scss files
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              query: {
                gifsicle: {
                  interlaced: true
                },
                mozjpeg: {
                  progressive: true
                },
                optipng: {
                  optimizationLevel: 7
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                }
              }
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.mp3$/,
        use: 'file-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000
          },
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css'
    }),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html'
    }),
    new SVGSpritemapPlugin({
      src: path.join(process.cwd(), 'src/**/*.svg'),
      styles: '~_sprites.scss'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.scss',
      '.react.js'
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main'
    ]
  },
  optimization: {
    namedModules: true,
    splitChunks: {
      name: 'vendor',
      minChunks: 2
    }
  }
};
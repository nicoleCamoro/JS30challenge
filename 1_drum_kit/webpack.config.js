import webpack from 'webpack'
import path from 'path'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

let extractStyles = new ExtractTextPlugin('[name].css')
let extractHtml = new ExtractTextPlugin('[name].html')

let config = {
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: false
  },
  entry: {
    index: [
      path.resolve(__dirname, 'templates/index.pug')
    ],
    'css/': [
      path.resolve(__dirname, 'assets/styles/style.scss')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: extractHtml.extract({
          loader: ['html-loader', 'pug-html-loader?pretty&exports=false']
        })
      },
      {
        test: /\.scss$/,
        loader: extractStyles.extract({
          loader: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
	  },
	  {
		test: /\.js$/,
		exclude: /node_modules\/*/,
		use: ['babel-loader'],
		options: {
			presets: [
			['es2015']
			]
		}
	  }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      options: {
        postcss: [
          autoprefixer({
            browsers: ['last 2 version', 'Explorer >= 10', 'Android >= 4']
          })
        ],
        sassLoader: {
          includePaths: [
            path.resolve(__dirname, 'node_modules/sanitize.css/')
          ]
        }
      }
    }),
    extractStyles,
    extractHtml
  ]
}

export default config
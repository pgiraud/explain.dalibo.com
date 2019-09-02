const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: './app/static/js/index.js',
    plan: './app/static/js/plan.js'
  },
  output: {
    path: path.resolve(__dirname, 'app/static/dist'),
    publicPath: 'dist/',
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js'
  },
  optimization: {
    // one runtime for all entrypoints
    runtimeChunk: 'single',
    // readable chunk ids even in production mode
    chunkIds: 'named',
    splitChunks: {
      chunks: 'all'
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new AssetsPlugin({
      prettyPrint: true,
      entrypoints: true,
      filename: './app/static/dist/assets.json',
    })
  ],
  module: {
    rules: [
      {
        test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]?[hash]',
          publicPath: '/static/dist/'
        }
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run postcss actions
          options: {
            plugins: function () { // postcss plugins, can be exported to postcss.config.js
              return [
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      },
    ]
  },
  resolve: {
  alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  performance: {
    hints: false
  }
};
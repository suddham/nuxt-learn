'use strict'

const webpack                  = require('webpack')
const merge                    = require('webpack-merge')
const OptimizeCSSAssetsPlugin  = require('optimize-css-assets-webpack-plugin')
const MiniCSSExtractPlugin     = require('mini-css-extract-plugin')
const UglifyJSPlugin           = require('uglifyjs-webpack-plugin')
const CompressionPlugin        = require('compression-webpack-plugin')
const ExtractTextPlugin        = require("extract-text-webpack-plugin")
const path                     = require("path")
const glob                     = require("glob-all")
const PurgecssPlugin           = require("purgecss-webpack-plugin")
const helpers                  = require('./helpers')
const commonConfig             = require('./webpack.config.common')
const isProd                   = process.env.NODE_ENV === 'production'
const environment              = isProd ? require('./env/prod.env') : require('./env/staging.env')


/**
 * Custom PurgeCSS Extractor
 * https://github.com/FullHuman/purgecss
 * https://github.com/FullHuman/purgecss-webpack-plugin
 */
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g);
  }
}

const webpackConfig = merge(commonConfig, {
  mode: 'production',
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: 'js/[hash].js',
    chunkFilename: 'js/[id].[hash].chunk.js'
  },
  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: [ 'default', { discardComments: { removeAll: true } } ],
        }
      }),
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: !isProd
      })
    ],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name (module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
            return `npm.${packageName.replace('@', '')}`
          }
        },
        styles: {
          test: /\.css$/,
          name: 'styles',
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  rules: [
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [{ loader: "css-loader", options: { importLoaders: 1 } }, "postcss-loader"]
      })
    }
  ],
  plugins: [
    new webpack.EnvironmentPlugin(environment),
    new MiniCSSExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css'
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css)$'),
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin("styles.css"),
    new PurgecssPlugin({
      paths: glob.sync([
        path.join(__dirname, "resources/assets/js/**/*.vue")
      ]),
      extractors: [
        {
          extractor: TailwindExtractor,
          extensions: ["js", "vue"]
        }
      ]
    })
  ],
})

if (!isProd) {
  webpackConfig.devtool = 'source-map'

  if (process.env.npm_config_report) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
  }
}

module.exports = webpackConfig

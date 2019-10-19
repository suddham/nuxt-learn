'use strict'

const VueLoaderPlugin      = require('vue-loader/lib/plugin')
const HtmlPlugin           = require('html-webpack-plugin')
const tailwindcss          = require("tailwindcss")
const autoprefixer         = require("autoprefixer")
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const helpers              = require('./helpers')
const isDev                = process.env.NODE_ENV === 'development'

const webpackConfig = {
  entry: {
    polyfill: '@babel/polyfill',
    main: helpers.root('src', 'main'),
  },
  resolve: {
    extensions: [ '.js', '.vue' ],
    alias: {
      'vue$': isDev ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.runtime.min.js',
      '@': helpers.root('src'),
      '@styles': helpers.root('src/styles/')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [ helpers.root('src') ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [ helpers.root('src') ]
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
          { loader: 'sass-loader', options: { sourceMap: isDev } }
        ]
      },
      {
        test: /\.sass$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
          { loader: 'sass-loader', options: { sourceMap: isDev } },
          { loader: 'postcss-loader', options: {
              ident: 'postcss',
              plugins: [
                tailwindcss("@/tailwind.js"),
                autoprefixer({
                  add: true,
                  grid: true
                }),
              ],
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlPlugin({ template: 'index.html', chunksSortMode: 'dependency' })
  ]
}

module.exports = webpackConfig

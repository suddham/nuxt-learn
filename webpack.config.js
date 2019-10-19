'use strict'

const environment = (process.env.NODE_ENV || 'development').trim()

if (environment === 'development') {
  module.exports = require('./src/config/webpack.config.dev')
} else {
  module.exports = require('./src/config/webpack.config.prod')
}

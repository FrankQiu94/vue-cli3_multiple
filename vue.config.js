/* eslint-disable no-alert, no-console */
const TITLES = require('./src/common/config/title.js')
const DEPENDENCE = require('./src/common/config/dependence.js')
const path = require('path')
function resolve (dir) {
  return path.resolve(__dirname, dir)
}
const glob = require('glob')
const fs = require('fs')

const fileConfig = {
  entry: 'main.js',
  html: 'index.html',
  pattern: ['src/pages/*']
}

const getPages = () => {
  const _pages = {}
  const _pageEntries = fileConfig.pattern.map(e => {
    const _matches = glob.sync(resolve(e))
    return _matches.filter(match => fs.existsSync(`${match}/${fileConfig.entry}`))
  })
  Array.prototype.concat.apply([], _pageEntries).forEach(dir => {
    const _filename = dir.split('pages/')[1]
    const _pathName = `src${dir.split('src')[1]}`
    const title = TITLES[_filename] || 'vue-cli3多页面应用项目结构'
    const _chunks = DEPENDENCE[_filename] || []
    _pages[_filename] = {
      entry: `${_pathName}/${fileConfig.entry}`,
      template: `src/common/pages/${fileConfig.html}`,
      filename: `${_filename}/${fileConfig.html}`,
      title,
      chunks: [..._chunks, 'vue', 'fastclick', 'common', _filename],
      favicon: './public/favicon.ico'
    }
  })
  return _pages
}

const pages = getPages()
module.exports = {
  // 可配置baseUrl，更改生产环境下静态资源路径
  baseUrl: process.env.NODE_ENV === 'production'
    ? '。。/'
    : '/',
  outputDir: 'output',
  // 生产环境绝对路径，开发环境拼接后绝对路径
  assetsDir: process.env.NODE_ENV === 'production'
    ? '/'
    : '',
  integrity: true,
  productionSourceMap: false,
  pages,
  chainWebpack (config) {
    config.resolve.alias
      .set('@src', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@pages', resolve('src/pages'))
      .set('@common', resolve('src/common'))
      .set('@routers', resolve('src/routers'))
      .set('@components', resolve('src/components'))
    config.resolve.extensions
      .values(['.js', '.vue', '.json', '.less', '.woff', '.ttf'])
    config.module
      .rule('fonts')
      .use('url-loader')
      .tap(options => {
        options.name = process.env.NODE_ENV === 'production'
          ? 'fonts/[name].[hash:8].[ext]'
          : options.name
        return options
      })
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        options.limit = 1000
        // 控制环境img标签src图绝对路径路径问题
        options.fallback.options.name = process.env.NODE_ENV === 'production'
          ? 'img/[name].[hash:8].[ext]'
          : options.fallback.options.name
        return options
      })
    config.module
      .rule('svg')
      .use('file-loader')
      .tap(options => {
        // 控制环境svg路径
        options.name = process.env.NODE_ENV === 'production'
          ? 'img/[name].[hash:8].[ext]'
          : options.name
        return options
      })
    config.module
      .rule('media')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        options.fallback.options.name = process.env.NODE_ENV === 'production'
          ? 'media/[name].[hash:8].[ext]'
          : options.fallback.options.name
        return options
      })
    Object.keys(pages).forEach(entryName => {
      config.plugins.delete(`prefetch-${entryName}`)
    })
    if (process.env.NODE_ENV === 'production') {
      config.plugin('extract-css').tap(() => [
        {
          filename: '[name]/css/style.[contenthash:8].css',
          chunkFilename: 'chunk/css/[name].[contenthash:8].css'
        }
      ])
    }
    // 禁止chunk抽离，减少多项目内无依赖包却在chunk引入
    // config.optimization.delete('splitChunks')
  },
  configureWebpack (config) {
    console.log(`
      \n=========================================\n
      当前编译模式为:${process.env.NODE_ENV} ${process.env.CURRENT_ENV || ''}
      \n=========================================\n
    `)
    if (process.env.NODE_ENV === 'production') {
      config.output.filename = '[name]/js/app.[contenthash:8].js'
      config.output.chunkFilename = 'statics/js/[name].[contenthash:8].js'
      config.optimization.splitChunks.minChunks = 10
      config.optimization.splitChunks.cacheGroups = {
        common: {
          chunks: 'all',
          test: /[\\/]src[\\/]common[\\/]actions[\\/]/,
          name: 'common',
          minChunks: 2,
          maxInitialRequests: 10,
          minSize: 0,
          priority: 0
        },
        fastclick: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]fastclick[\\/]/,
          name: 'fastclick',
          minChunks: 1,
          maxInitialRequests: 10,
          minSize: 0,
          priority: 1
        },
        vue: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]vue[\\/]/,
          name: 'vue',
          minChunks: 1,
          maxInitialRequests: 10,
          minSize: 0,
          priority: 2
        },
        html2canvas: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]html2canvas[\\/]/,
          name: 'html2canvas',
          minChunks: 1,
          maxInitialRequests: 10,
          minSize: 0,
          priority: -1
        },
        qrcode: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]qrcode[\\/]/,
          name: 'qrcode',
          minChunks: 1,
          maxInitialRequests: 10,
          minSize: 0,
          priority: -1
        },
        swiper: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]swiper[\\/]/,
          name: 'swiper',
          minChunks: 1,
          maxInitialRequests: 10,
          minSize: 0,
          priority: -1
        },
        'mint-ui': {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]mint-ui[\\/]/,
          name: 'mint-ui',
          minChunks: 1,
          maxInitialRequests: 10,
          minSize: 0,
          priority: -1
        },
        'vue-clipboard2': {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]vue-clipboard2[\\/]/,
          name: 'vue-clipboard2',
          minChunks: 1,
          maxInitialRequests: 10,
          minSize: 0,
          priority: -1
        }
      }
    } else {
      config.devtool = 'source-map'
    }
  },
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8181,
    https: false,
    hotOnly: false,
    proxy: getProxy(),
    before (app) {}
  }
}

function getProxy () {
  let _proxy
  if (process.env.NODE_ENV === 'production') {
    _proxy = ''
  } else {
    _proxy = process.env.VUE_APP_HOSTAPI
  }
  return _proxy
}

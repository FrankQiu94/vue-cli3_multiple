const TITLES = require('./src/common/pages/title.js')
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
    const title = TITLES[_filename]
    _pages[_filename] = {
      entry: `${_pathName}/${fileConfig.entry}`,
      template: `src/common/pages/${fileConfig.html}`,
      filename: `${_filename}/${fileConfig.html}`,
      title,
      chunks: [_filename],
      favicon: './public/favicon.ico'
    }
  })
  return _pages
}

const pages = getPages()
module.exports = {
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
    config.resolve.extensions
      .values(['.js', '.vue', '.json', '.less', '.woff', '.ttf'])
    config.module
      .rule('fonts')
      .use('url-loader')
      .tap(options => {
        options.name = '../fonts/[name].[hash:8].[ext]'
      })
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        options.limit = 100
        // 控制环境img标签src图绝对路径路径问题
        options.fallback.options.name = process.env.NODE_ENV === 'production'
          ? 'img/[name].[hash:8].[ext]'
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
          chunkFilename: '[name]/css/style.[contenthash:8].css'
        }
      ])
    }
    // 禁止chunk抽离，减少多项目内无依赖包却在chunk引入
    config.optimization.delete('splitChunks')
  },
  configureWebpack (config) {
    console.log(`
      \n=========================================\n
      当前编译模式为:${process.env.NODE_ENV} ${process.env.CURRENT_ENV || ''}
      \n=========================================\n
    `)
    if (process.env.NODE_ENV === 'production') {
      config.output = {
        path: resolve('./dist'),
        filename: '[name]/js/app.[contenthash:8].js',
        publicPath: '/',
        chunkFilename: '[name]/js/app.[contenthash:8].js'
      }
    } else {

    }
  },
  devServer: {
    open: true,
    host: 'localhost',
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

'use strict'
const path = require('path')
// const AutoImport = require('unplugin-auto-import/webpack')
// const Components = require('unplugin-vue-components/webpack')
// const ElementPlus = require('unplugin-element-plus/webpack')
// const Icons = require('unplugin-icons/webpack')

// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
// const IconsResolver = require('unplugin-icons/resolver')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

function resolve(dir) {
  return path.join(__dirname, dir)
}

const pathSrc = path.resolve(__dirname, 'src')

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  publicPath: isProd ? '/' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: isDev,
  productionSourceMap: false,
  css: {
    extract: isProd,
    sourceMap: false,
    loaderOptions: {
      scss: {
        additionalData: `
					@import "./src/assets/element/index.scss";
				  @import "./src/assets/style/index.scss";
				`
      }
    }
  },
  // webpack-dev-server 相关配置
  devServer: {
    host: '0.0.0.0',
    port: 80,
    open: true,
    disableHostCheck: true,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: `${process.env.VUE_APP_BASE_API}`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  configureWebpack: {
    name: 'coblog',
    resolve: {
      alias: {
        '@': resolve('src'),
        assets: resolve('src/assets'),
        components: resolve('src/components'),
        public: resolve('public')
      }
    },
    externals: {
      '@waline/client': 'Waline'
    },
    plugins: [
      // AutoImport({
      //   resolvers: [
      //     ElementPlusResolver(),
      //     IconsResolver({
      //       prefix: 'I'
      //     })
      //   ],
      //   dts: path.resolve(pathSrc, 'auto-imports.d.ts')
      // }),
      // Components({
      //   resolvers: [
      //     IconsResolver({
      //       enabledCollections: ['ep']
      //     }),
      //     ElementPlusResolver()
      //   ],
      //   dts: path.resolve(pathSrc, 'components.d.ts')
      // }),
      // ElementPlus({
      //   useSource: true
      // }),
      // Icons({
      //   autoInstanll: true
      // }),
      // new BundleAnalyzerPlugin()
    ]
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: ['']
    }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.when(!isDev, config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementPlus', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-plus(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
    })
  }
}

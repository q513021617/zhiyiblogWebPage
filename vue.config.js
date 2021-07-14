const webpack = require('webpack')

module.exports = {
  configureWebpack: { externals: 'hls.js' },
    // 选项...
  publicPath: './', //发布路径,用相对路径，不然会报错
  lintOnSave: false, //是否开启eslint校验
  devServer: {
    proxy: { //配置代理，解决跨域请求后台数据的问题
      '/blogapi/': {
        target: 'http://127.0.0.1:7888/',
        // target: 'http://www.zhiyigo.cn/blogapi/', //后台接口
        ws: true, //是否跨域
        changeOrigin: true,
        pathRewrite: {
          '^/blogapi':'/'
        }
      }
    }
  },
  pwa: {
    workboxPluginMode: 'GenerateSW', // 也可以定义为‘InjectManifest’模式。但是需自己写SW.js文件进行配置
    workboxOptions: {
        importWorkboxFrom: 'cdn', //从''cdn"导入workbox,也可以‘local’
        skipWaiting: true, // 安装完SW不等待直接接管网站
        clientsClaim: true,
        navigateFallback: '/index.html', 
        exclude: [/\.(?:png|jpg|jpeg|svg)$/], //在预缓存中排除图片
        // 定义运行时缓存
        runtimeCaching: [
            {
                urlPattern: new RegExp('^https://cdn'),
                handler: 'NetworkFirst',
                options: {
                    networkTimeoutSeconds: 20,
                    cacheName: 'cdn-cache',
                    cacheableResponse: {
                        statuses: [200]
                    }
                }
            }
        ]
    }
},
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
     
                jQuery:"jquery",
                "windows.jQuery":"jquery"
            })
        ]
    }
   
}
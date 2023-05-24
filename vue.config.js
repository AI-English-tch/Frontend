const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
  port: 9090,
  open: true,
  // before: require('./mock/mock-server.js'),
  // 使用代理
  proxy: {
    '/dev-api': {
      target: 'http://10.41.250.47:9090/', 
      changeOrigin: true,
      pathRewrite: {
        '^/dev-api': ''
      }
    }
  }
},
})

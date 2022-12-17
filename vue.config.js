const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true
})

// 透過設定 devServer 可以在開發時自動進行跨域處理
//關閉語法檢查
lintOnSave:false

//開啟代理服務器 要轉發給8000
module.exports = {
  // devServer: {
  //   proxy: 'http://localhost:8000'
  // }
 //publicPath: process.env.NODE_ENV === 'production' ?'/':'/',
  devServer: {
    proxy: {
      '/api':{
        target:'http://192.168.100.101:8000',//??端口號8000事後端端口號~????
        //不讓/api一起送到後端資料庫
        pathRewrite:{'^/api':'/'},
        ws:false,//用於支持websocket
        changeOrigin:true//說謊變成與後端父務起同一個端口號
      }
    }
  }
}
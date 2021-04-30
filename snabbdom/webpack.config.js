const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const isProductionMode = process.env.NODE_ENV === "production";
module.exports={
  entry:'./src/index.js',
  output:{
    filename:'[hash:10].bundle.js',
    path:resolve(__dirname,'dist'),     // ext 取文件原来扩展名
    clean: true,
  },
  plugins:[
    // 详情plugins 配置
     new HtmlWebpackPlugin({
        title:'管理输出',
        template:'./src/index.html'
     }),
   
  
  ],
  mode:'development',
  // 开发服务器 devServer:用来自动化(自动编译，自动打开浏览器,自动刷新浏览器)
  // 特点: 只会在内存中编译打包,不会有任何输出
  devServer:{
    contentBase:resolve(__dirname,'dist'),
    compress:true, // 启用 gizp 压缩
    port:9000,
    open:true
  }
}
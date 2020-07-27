//服务器启动模块
const express = require('express');
const dohttp=require('./dohttp');
const app = express();
var cs = require('cookie-session')
  
var path = require('path');
//使用sion模块
app.use(cs({

    //用于cookie值的加密的关键字
    name: 'sessionID',
    keys: ["Alice"],
}))

//利用experess托管静态资源.设置静态资源所在路径即可
app.use(express.static('public'))


app.use(express.static(path.join(__dirname, './views')));
app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './public/img')));
//设置模板引擎加载资源的后缀
app.engine('html',require('express-art-template'))

var router=require('./router');
//设置get请求的监听
//使用箭头函数做get请求事件的回调
app.use(router);//这个是属于外置中间件
//app.method(url,fun)内置路由
app.listen(8888, function(){
    console.log("访问127.0.0.1：8888");
})

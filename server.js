var express=require('express');
//创建app应用，相当于=>Node.js Http.createServer();
var app=express();
//监听http请求
app.use(express.static(__dirname+'/dist'))
app.listen(8081);
console.log("doing");

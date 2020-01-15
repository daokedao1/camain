
var PORT = 3030;



var http = require('http');

var url=require('url');

var fs=require('fs');

var mine=require('./mime').types;//引入mime文件

var path=require('path');

var httpProxy = require('http-proxy');



var proxy = httpProxy.createProxyServer({

    target: 'http://biman.mryitao.cn/',   //接口地址

    changeOrigin: true,
    ignorePath: false

    // 下面的设置用于https

    // ssl: {

    //     key: fs.readFileSync('server_decrypt.key', 'utf8'),

    //     cert: fs.readFileSync('server.crt', 'utf8')

    // },

    // secure: false

});



proxy.on('error', function(err, req, res){//代理错误，绑定事件

    res.writeHead(500, {

        'content-type': 'text/plain'

    });
    console.log(err);

    res.end('Something went wrong. And we are reporting a custom error message.');

});

proxy.on('proxyRes', function(proxyRes, req, res) {//代理成功，绑定事件
    let host = proxyRes.req.getHeader('host');
    let {path} = proxyRes.req;

    console.log('host',host);
    console.log('path',path);

});



var server = http.createServer(function (request, response) {

    var {pathname} = url.parse(request.url);
    var realPath = path.join('./', pathname);// 指定根目录（index.html文件的父级目录）

    console.log(pathname);
    console.log(realPath);

    var ext = path.extname(realPath);

    ext = ext ? ext.slice(1) : 'unknown';



    //判断如果是接口访问，则通过proxy转发

    if(pathname.indexOf('venus') > 0){//要求所有接口都有'/api'部分
        console.log('调用接口');

        proxy.web(request, response,{target: 'http://biman.mryitao.cn'});

        return;

    }

    // proxy.web(request, response,{target: 'http://biman.mryitao.cn'});



    fs.exists(realPath, function (exists) {

        if (!exists) {

            response.writeHead(404, {

                'Content-Type': 'text/plain'

            });



            response.write('This request URL ' + pathname + ' was not found on this server.');

            response.end();

        } else {

            fs.readFile(realPath, 'binary', function (err, file) {

                if (err) {

                    response.writeHead(500, {

                        'Content-Type': 'text/plain'

                    });

                    response.end(err);

                } else {

                    var contentType = mine[ext] || 'text/plain';

                    response.writeHead(200, {

                        'Content-Type': contentType

                    });

                    response.write(file, 'binary');

                    response.end();

                }

            });

        }

    });

});

server.listen(PORT);

console.log('Server runing at port: ' + PORT + '.');
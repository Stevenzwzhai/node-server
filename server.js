//node模块
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
//自定义文件类型模块
var mime = require('./mime');
//定义根目录和端口号
var port = 8000;
var dir = 'src';

//创建服务
var server = http.createServer(function(req, res){

	var pathname = url.parse(req.url).pathname;
	var dirPath = path.join(dir, pathname);
	var ext = path.extname(dirPath);
	ext = ext?ext.slice(1) : 'unknow';
	fs.exists(dirPath, function(exists){
		if(exists){
			fs.readFile(dirPath, 'binary', function(err,file){
				if(err){
					res.writeHead(500, {
						'Content-type': 'text/plain'
					});
					res.end(err);
				}else{
					var contentType = mime.types[ext] || 'text/plain';
					res.writeHead(200, {
						'Content-type': contentType
					});
					res.write(file,'binary');
					res.end();
				}
			})
		}else{
			res.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            res.write("not fund");
            res.end();
		}
	})

});
server.listen(port);
console.log('server start,port:'+port);
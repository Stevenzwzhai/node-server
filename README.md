>我们做本地服务器，经常会选择Apache、IIS或者Tomcat，当然这些最方便的算是Apache,几乎不需要配置，最多就是配置下端口，亦或者我们想不用localhost，改成其他也是可以的，只要去更改hosts文件即可。但是学了node怎么能不用用呢，这里介绍如何用node实现你自己的服务器。

####1.需要什么
首先我们需要启动文件，然后就是放置我们要打开的文件的目录，在这里我们对要打开的文件类型不同的解析，所以加了个mimeTyep文件，然后就是一个快速启动方式。目录如下：

![catalog.png](http://upload-images.jianshu.io/upload_images/454462-ee7af2fbaa331f97.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
####2.启动文件
使用http模块创建服务

    var server = http.createServer(function(req, res){
          //code...
    }）
对请求文件的基本解析

     //请求的文件
    var pathname = url.parse(req.url).pathname;
    //解析文件路径（dir就是定义的默认文件存放目录）
    var dirPath = path.join(dir, pathname);
    //获取文件类型
    var ext = path.extname(dirPath);
    ext = ext?ext.slice(1) : 'unknow';
在发起请求的时候我们要根据文件类型添加不同的content-type

    var mime = require('./mime');
    contentType = mime.types[ext] || 'text/plain';
    res.writeHead(200, {
        'Content-type': contentType
    });
监听端口
  
    server.listen(port);
####3.启动
启动很简单了，直接node server,你就可以在浏览器中localhost://port/file,这里为了方便启动服务，建立一个server.bat文件，里面的内容其实就是node server

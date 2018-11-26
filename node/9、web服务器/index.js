var http = require("http");
var url = require("url");
var fs = require("fs");

http.createServer(function (request, response) {

    //请求路径
    var pathname = url.parse(request.url).pathname;

    console.log("路径："+pathname);

	//路径处理
    if(pathname.indexOf('/favicon.ico')==-1){
        fs.readFile(pathname.substr(1),function (err, data) {
            if(err){
                console.log(err);
                // HTTP 状态码: 404 : NOT FOUND
                // Content Type: text/plain
                response.writeHead(404, {'Content-Type': 'text/html'});
            }else{
                response.writeHead(200,{'Content-Type': 'text/html'});
                console.log("data:"+data);
                response.write(data.toString());
            }
            response.end();
        })
    }else{
        response.end();
    }


}).listen(8888);

console.log("node启动：http://127.0.0.1:8888");
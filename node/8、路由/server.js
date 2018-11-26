var http = require("http");
var url = require("url");

function start(route) {
    function onRequest(request, response) {
        var pathName = url.parse(request.url).pathname;

        if(pathName.indexOf('/favicon.ico')==-1){
            console.log("服务器接受请求路径："+pathName+"");
            route(pathName);//路由处理
        }
        response.writeHead(200,{"Content-Type":"text/plain"});
        response.write("Hello World:"+pathName);
        response.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started:http://127.0.0.1:8888");
}
exports.start = start;
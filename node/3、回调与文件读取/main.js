var fs = require("fs");

/*
//阻塞代码(同步)
var data = fs.readFileSync('data.txt');
console.log(data.toString());
console.log("程序执行结束!");
*/

//非阻塞代码（异步）
fs.readFile("data.txt",function (err,data) {
    if(err){
        console.log("读取文件出错");
    }else{
        console.log(data.toString());
    }
});
console.log("程序执行结束");




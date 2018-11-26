/**
 * 从流中读取数据
 */

var fs = require("fs");

var data = "";

// 创建可读流
var readStream = fs.createReadStream("data/text01.txt");

// 设置编码为 utf8。
readStream.setEncoding("utf8");

// 处理流事件 --> data, end, error
readStream.on('data',function (chunk) {
    console.log(data.length+":"+chunk);
    data+=chunk;
});

readStream.on('end',function () {
    console.log("data:"+data);
});

readStream.on("error",function (err) {
    console.log(err.stack);
});

console.log("程序开始执行");
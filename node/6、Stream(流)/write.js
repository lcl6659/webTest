/**
 * 写入流
 */

var fs = require("fs");
var data = "Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。";

// 创建一个可以写入的流，写入到文件 output.txt 中
var writeStream = fs.createWriteStream("data/output.txt");

// 使用 utf8 编码写入数据
writeStream.write(data,"utf8");

// 标记文件末尾
writeStream.end();

writeStream.on('finish',function () {
    console.log("写入完成");
});

writeStream.on("error",function (err) {
    console.log(err.stack);
});

console.log("程序开始")



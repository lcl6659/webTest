/**
 * 管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。
 */

var fs = require("fs");

var readStream = fs.createReadStream("data/text01.txt");

var writeStream = fs.createWriteStream("data/output.txt");

readStream.pipe(writeStream);

console.log("开始执行");

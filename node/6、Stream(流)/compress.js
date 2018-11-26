/*
 *链式是通过连接输出流到另外一个流并创建多个对个流操作链的机制。链式流一般用于管道操作。
接下来我们就是用管道和链式来    压缩文件。
 */

var fs = require('fs');
var zlib = require('zlib');

fs.createReadStream("data/text01.txt").pipe(zlib.createGzip()).pipe(fs.createWriteStream("data/text01.txt.gz"));

console.log("压缩结束");

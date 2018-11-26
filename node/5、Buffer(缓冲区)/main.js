//http://www.runoob.com/nodejs/nodejs-buffer.html
/**
 JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。
 但在处理像TCP流或文件流时，必须使用到二进制数据。
 因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。
 在 Node.js 中，Buffer 类是随 Node 内核一起发布的核心库。
 Buffer 库为 Node.js 带来了一种存储原始数据的方法，可以让 Node.js 处理二进制数据，
 每当需要在 Node.js 中处理I/O操作中移动的数据时，就有可能使用 Buffer 库。原始数据存储在 Buffer 类的实例中。一个 Buffer 类似于一个整数数组，
 但它对应于 V8 堆内存之外的一块原始内存。
 */

var buf = new Buffer(256);
var len = buf.write("www.baidu.com");
console.log("写入字节数 :"+len);

var content = buf.toString();
console.log("读取缓存的值："+content);

var buf00 = new Buffer("xnsjnxs");
var json = buf00.toJSON();
console.log("转JSON:"+JSON.stringify(json));

var buf01 = new Buffer("http://www.baidu.com");
var buf02 = new Buffer("百度网址");
var buf03 = Buffer.concat([buf01,buf02]);
console.log("合并后的值："+buf03.toString());


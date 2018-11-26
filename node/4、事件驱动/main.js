// 引入 events 模块
var events = require("events");
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

// 绑定 connection 事件处理程序
eventEmitter.on("connection",function (arg01,arg02) {
    console.log("连接成功");
    console.log(arg01);
    console.log(arg02);
    eventEmitter.emit("data_received");
});

// 使用匿名函数绑定 data_received 事件
eventEmitter.on("data_received",function () {
    console.log('数据接收成功。');
});

// 触发 connection 事件
eventEmitter.emit('connection',"参数1",'canshu2');

console.log("程序执行完成");
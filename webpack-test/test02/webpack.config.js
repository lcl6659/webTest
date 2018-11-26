var path = require("path");
module.exports = {
	entry:'./src/js/main.js',//打包的入口文件
	output:{
		path:path.resolve(__dirname,'./dist/js'),//打包文件存放的位置
		filename:'bundle.js'//打包后的文件名
	}
}

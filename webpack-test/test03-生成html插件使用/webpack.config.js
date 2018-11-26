var path = require("path");
var htmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
	entry:{
		main:"./src/js/main.js",
		tools:"./src/js/tools.js"
	},
	output:{
		path:path.resolve(__dirname,"./dist"),//输出的路径
		filename:"js/[name].js"//输出的文件名
	},
	plugins:[
		new htmlWebPackPlugin({
			template:"index.html",//模版
			filename:"index.html",//打包后的名称
			inject:"head",//将打包的脚本插在head内
			title:"webpack插件传值",
			hash:true,//true | false如果true然后为所有包含的脚本和CSS文件附加一个唯一的webpack编译哈希。这对于缓存清除非常有用。
			minify:{
				minifyJS:true,//压缩html内的js脚本
				minifyCSS:true,//压缩html内的style样式
				removeComments:true,//删除注释
				collapseWhitespace:true//折叠对文档树中的文本节点有贡献的空白空间
			}
		})
	]
}

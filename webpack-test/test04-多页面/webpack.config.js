var path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry:{
		main:"./src/js/main.js",
		a:"./src/js/a.js",
		b:"./src/js/b.js",
		c:"./src/js/c.js"
	},
	output:{
		path:path.resolve(__dirname,"./dist"),
		filename:"js/[name].js"
	},
	plugins:[
		new htmlWebpackPlugin({
			template:"index.html",
			filename:"view/a.html",
			inject:"head",
			title:"this is a.html",
			chunks:['main','a']//需要引入的chunk
		}),
		new htmlWebpackPlugin({
			template:"index.html",
			filename:"view/b.html",
			inject:"head",
			title:"this is b.html",
			chunks:['b']//需要引入的chunk
		}),
		new htmlWebpackPlugin({
			template:"index.html",
			filename:"view/c.html",
			inject:"head",
			title:"this is c.html",
			chunks:['c']//需要引入的chunk
		}),
	]
}

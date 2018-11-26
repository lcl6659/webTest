var path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry:"./src/app.js",
	output:{
		path:path.resolve(__dirname,"./dist"),
		filename:"js/[name].bundle.js"
	},
	module:{
		loaders:[
			{
				test:/\.js$/,
				loader:"babel-loader",
				exclude:/node_modules/,//打包的时候排除的目录，提高打包速度
				query:{
					presets:["es2015"]
				}
			}
		]
	},
	plugins:[
		new htmlWebpackPlugin({
			template:"index.html",
			filename:"index.html",
			inject:"head",
			hash:true
		})
	]
}

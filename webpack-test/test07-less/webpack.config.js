var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry:"./src/js/main.js",
	output:{
		path:path.resolve(__dirname,"./dist"),
		filename:"js/[name].js"
	},
	module:{
		rules:[	
			{
				test:/\.js$/,
				exclude: /(node_modules|bower_components)/,
				use:{
					loader:"babel-loader",
					options:{
						presets:["env"]
					}
				}
			},
			{
				test:/\.css$/,
				use:[
					"style-loader",
					"css-loader"
				]
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:"index.html",
			filename:"index.html",
			hash:true,
			inject:"head"
		})
	]
}

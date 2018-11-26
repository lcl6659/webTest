var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/js/main.js",
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "js/[name].bundle.js"
	},
	module: {
		rules: [{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015']
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [
								require('autoprefixer')(),
							]
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "index.html",
			filename: "index.html",
			hash: true,
			inject: "head"
		})
	]
}
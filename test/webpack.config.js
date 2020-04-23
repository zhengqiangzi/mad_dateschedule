var path=require("path")
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports={

 	 entry: './src/main.js',
 	 output:{
 	 	path:path.resolve("./dist"),
 	 	filename:"index.js"

 	 },
 	 mode:"production",
 	 module: {
		rules: [
			{ test: /\.vue$/, use: [{loader:'vue-loader'}] },
			{ test: /\.js$/, use: [{loader:'babel-loader'}] },
			{ test: /\.css$/, use: [{loader:'css-loader'}] },
		]
	},
	plugins: [
    // 请确保引入这个插件！
    	new VueLoaderPlugin()
  	],
	resolve:{
	  	extensions: ['.js','.vue']

	 }


}



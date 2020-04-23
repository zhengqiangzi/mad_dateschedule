var path=require("path")
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports={

 	 entry: {
 	 	index:'./src/main.js',
 	},
 	 output:{
 	 	path:path.resolve("./dist"),
 	 	filename:"[name].js",
		libraryTarget: "umd",
		library: "mad_dateschedule"



 	 },
 	 mode:"production",
 	 module: {
		rules: [
			{ test: /\.vue$/, use: [{loader:'vue-loader'}] },
			{ test: /\.js$/, use: [{loader:'babel-loader'}] },
			{ test: /\.css$/, use: [{loader:'style-loader'},{loader:'css-loader'}] },
		]
	},
	plugins: [
    // 请确保引入这个插件！
    	new VueLoaderPlugin()
  	],
	resolve:{
	  	extensions: ['.js','.vue']

	 },
	externals: [
		{
			"moment": 'moment',
			"lodash": 'lodash',
			"vue-form":"vue-form",
			"numeral":"numeral",
			"validator":'./validator',
		},
		function(context, request, callback) {

			 if (request=="validator"){
			        return callback(null, 'commonjs ' + request);
			    }
			
				callback();
		}

	]


}



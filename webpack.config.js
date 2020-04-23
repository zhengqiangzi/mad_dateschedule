var path=require("path")
module.exports={

 	 entry: './test/src/components/dateschedule/main.vue',
 	 output:{
 	 	path:path.resolve("./dist"),
 	 	filename:"index.js"

 	 },
 	 mode:"development"


}
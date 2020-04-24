# DataSchedule2 说明文档
## 运行本资集成环境
  cd test && vue ui
## 发布组件
   cd test && webpack && npm version xx.xx.xx && npm publish
## 应用实例 
```
<date-schedule-table 
	:include_today="true"  
	:disabled="disabled" 
	v-model="list" 
	:edit_ranger="edit_ranger" 
	:initdate="initdate"> 
</date-schedule-table>
```
## 组件按装
```
     npm install mad_dateschedule --save-dev
```
## 参数说明
### 组件参数 v-model/value (必要参数,如果没有数据，可以传入[])

v-model/value 需要传入到日期表格里面的数据。如果没有需要传入的数据。则v-model/value 为[]
v-model/value 需要传入时，数据格式 如下

	
	[
	    ....{
		id:moment().add(i,"day").format("YYYY-MM-DD"),
		date:moment().add(i,"day"),
		component_data:{
		    clicks:Math.ceil(Math.random()*10000),
		    impressions:Math.ceil(Math.random()*10000),
		    budget:Math.ceil(Math.random()*10000).toFixed(2)
		}
	    }....
	]
    	

### 组件参数 edit_ranger (非必要参数 默认为 [])
    日期表格中的数据那些日期表格中的数据可以编辑
    格式如下
    
        [
          ...{id:"2012-12-12"}...
        ]
    

### 组件参数 initdate ="2020-12-12" (非必要参数)
        日期表格中的初始化日期，默认为当天日期


### 组件参数 disabled （非必要参数,默认为 false）
是否禁用掉所有的日期表格操作


### 组件参数 include_today(非必要参数 默认为true)
组件的操作是否禁用 当天的数据

import { round2 } from '../numeral.formatter';

export let not_equare = function (value, attrValue, vnode) {
	//value不等于 attrvalue
	return value != attrValue;
}
export let big_than = function (value, attrValue, vnode) {

	return Number(value) > Number(attrValue)
}
export let big_eq_than = function (value, attrValue, vnode) {
	return Number(value) >= Number(attrValue)
}
export let small_than = function (value, attrValue, vnode) {
	return Number(value) < Number(attrValue)
}

export let small_eq_than = function (value, attrValue, vnode) {
	return Number(value) <= Number(attrValue)
}

//不接受小数点
export let keyzero = function (e) {

	(e.key == "." || (e.target.value == '' && e.key == '0')) && e.preventDefault();
};

//输入的数据只能包含"." "\d"
/*let fn_dotted_number=function(e){

	var is_dotted_number = /\.|\d|Backspace/.test(e.key);

	!is_dotted_number && e.preventDefault();
}*/

export let directive_no_dotted = {

	bind: function (el) {
		el.addEventListener("keydown", keyzero);
	},
	update: function () { },
	unbind: function (el) {
		el.removeEventListener("keydown", keyzero);
	}
}

/*export let directive_only_nummber_dotted={

	bind:function(el){

		el.addEventListener("keydown",fn_dotted_number);
	},
	update:function(){},

	unbind:function(el){

		el.removeEventListener("keydown",fn_dotted_number);
	}

}
*/


export let invalid_string = function (value, attrValue, vnode) {
	var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
	return !containSpecial.test(value)
}

export let date_small_than=function(value,attrValue,vnode){

	attrValue=Object.assign({},{ignore:false},attrValue)

	if(attrValue.ignore){

		return true;
	}
	//console.log(moment(new Date(value)).set("hour",0).set("minute",0).set("second",0).isBefore(moment(new Date(attrValue.target)).set("hour",0).set("minute",0).set("second",0)))
	return moment(new Date(value)).set("hour", 0).set("minute", 0).set("second", 0).isBefore(moment(new Date(attrValue.target)).set("hour", 0).set("minute", 0).set("second", 0))
}

export let date_big_than = function (value, attrValue, vnode) {
	attrValue = Object.assign({}, { ignore: false }, attrValue)
	if (attrValue.ignore) {
		return true;
	}
	return moment(new Date(value)).set("hour", 0).set("minute", 0).set("second", 0).isAfter(moment(new Date(attrValue.target)).set("hour", 0).set("minute", 0).set("second", 0))
}

export let required2=function(value,attrValue,vnode){

	attrValue=Object.assign({},{ignore:false},attrValue)

	if(attrValue.ignore){

		return true;
	}
	return value.length > 0;
}

export let required3 = function (value, attrValue, vnode) {

	attrValue = Object.assign({}, { ignore: false }, attrValue)
	if (attrValue.ignore) {
		return true;
	}
	let gg = value.map(x => {
		return x.data.filter(xx => {
			return xx.checked
		})
	})
	var kc = gg.filter(xxx => {
		return xxx.length > 0
	})
	return kc.length > 0;
}

//只能输入正整数( 0 ~ Infinity )
let positive_integer_fn = function (e) {
	var key = e.key;
	var is_number = /\d|Backspace/.test(key);
	if (!is_number) {
		//如果输入的key中不是数字或删除键，则不让其输入
		e.preventDefault();
	}
	var pre = e.target.value
	//如果当前值是以0开头且输入键不是Backspace,则不让其输入
	if (/^0/.test(pre) && key != "Backspace") {
		e.preventDefault();
	}
}



export let positive_integer = {
	bind: function (el) {
		el.addEventListener("keydown", positive_integer_fn);
	},
	update: function () { },
	unbind: function (el) {
		el.removeEventListener("keydown", positive_integer_fn);
	}

}

let positive_float_fn = (e) => {
	//console.log(e.key)
	var key = e.key;
	//只允许输入以下内容
	var is_number = /\d|Backspace|ArrowLeft|ArrowRight|ArrowUp|ArrowDown|Delete|\./.test(key);
	var value = e.target.value;
	if (!is_number) {
		//如果输入的key中不是数字或删除键，则不让其输入
		e.preventDefault();
		return;
	}
	var will_value = value + "" + e.key
	will_value = will_value.replace(/Backspace|ArrowLeft|ArrowRight|ArrowUp|ArrowDown|Delete/gi, "");
	//如果最终的数字不是有效的数字，则禁止此次输入
	if (isNaN(will_value) && key != "Backspace") {
		e.preventDefault();
	}
}

//只允许输入符点数
export let positive_float = {

	bind: function (el) {

		el.addEventListener("keydown", positive_float_fn);
	},
	update: function () { },

	unbind: function (el) {

		el.removeEventListener("keydown", positive_float_fn);
	}

}

let format_number_fn = function (binding, vnode, evt) {
	
	if (!evt.target.value && binding.modifiers.nozero)
	{
		evt.target.value=null
		vnode.componentInstance.$emit("go", null);
		vnode.componentInstance.$emit&&vnode.componentInstance.$emit("input",null)
		return;
	} 

	var temp = Number(evt.target.value).toFixed(binding.value || 2);
	
	evt.target.value = temp


	//vnode.componentInstance.$emit("input",temp)
	vnode.componentInstance.$emit("go", temp)
	vnode.componentInstance.$emit && vnode.componentInstance.$emit("input", temp)

}

export let format_number = {

	bind: function (el, binding, vnode) {
		var target = el.querySelector("input");
		target.addEventListener("blur", format_number_fn.bind(null, binding, vnode));
		try{

			format_number_fn(binding, vnode, { target: { value: vnode.data.model ? vnode.data.model.value : vnode.componentOptions.propsData.value  } })
		}catch(e){

			console.error(e)
		}
	},

 //	componentUpdated: function (el, binding, vnode, oldvNode){
		//console.log(123)
		//format_number_fn( binding, vnode, { target: { value:vnode.data.model.value } } );

	//}, 

/* 	update: function (el, binding, vnode, oldvNode){

		console.log(vnode.data.model.value)

	}, */

	unbind: function (el) {
		el.removeEventListener("blur", format_number_fn);
	}
}

//判断媒体列表中的mime类型是否合乎规则
export let mime = function (value, attrValue, vnode) {
	let status = true
	value = value instanceof Array ? value : [value];
	value.map((item) => {
		var a = item.type.toLocaleLowerCase();
		var b = attrValue.accept.join(",");//列表，存储所允许的mime类型
		var p = b.indexOf(a);
		if (p < 0) {
			status = false
		}
	})
	return status
}

export let mine2 = function (value, attrvalue, vnode) {

	//attrvalue,value)
	//console.log(value.length)
	/* console.log(value,attrvalue)
	console.log(value.indexOf(attrvalue)) */

	if (value.length <= 0) return true;
	let r = attrvalue.filter((item) => {
		return item != value
	})

	return r.length < attrvalue.length
}

//判断媒体列表中的数据是否合乎规则
export let mnumber=function(value,attrValue,vnode){
	
	attrValue = Object.assign({}, { spe: false }, attrValue);

	if (attrValue.spe==false){

		return value.length>=attrValue.min &&   value.length<=attrValue.max

	}else{

		let g = value.filter(x=>{

			return x.data.length >= attrValue.min && x.data.length <= attrValue.max
		})

		return g.length==value.length;
	}
}

//判断媒体元素是否合乎规则
export let mcapacity = function (value, attrValue, vnode) {

	let status = true
	value = value instanceof Array ? value : [value];


	value.map((item) => {

		//console.log(item.size,attrValue.maxSize)
		if (item.size > attrValue.maxSize) {

			status = false;
		}
	})
	//console.log(status)
	return status;
}
//判断媒体元素尺寸是否合乎规则

let fn1 = (value, attrValue, vnode) => {

	let status = true;
	value = value instanceof Array ? value : [value];

	value.map((item) => {

		var w = item.width;
		var h = item.height;
		var range = attrValue.sizeRange;


		if (!(w >= range.minWidth && w <= range.maxWidth && h >= range.minHeight && h <= range.maxHeight)) {
			status = false;
		}
	})
	return status
}

let fn2 = (value, attrValue, vnode) => {

	value = value instanceof Array ? value : [value];
	let isFind = true;
	var range = attrValue.sizeRange;
	value.map((item) => {

		var w = item.width;
		var h = item.height;
		let index = _.findIndex(range, { width: w, height: h });
		if (index < 0) {
			isFind = false;
		}
	})
	return isFind

}

export let sizeRange = function (value, attrValue, vnode) {


	//如果没有尺寸范围则不检查规则
	if (attrValue.sizeRange == null) return true

	if (attrValue.sizeRange instanceof Array) {

		return fn2(value, attrValue, vnode)

	} else {
		return fn1(value, attrValue, vnode)

	}

}

/*//严格尺寸验证
export let strictSizeRange = function(value,attrValue,vnode){


}
*/

export let numberRange = function (value, attrValue, vnode) {

	var min = attrValue.target[0];
	var max = attrValue.target[1];
	var ignore = attrValue.ignore || false;

	if (ignore) {

		return true
	} else {

		return value >= Number(min) && value <= Number(max);
	}

}

/*
	验证字符串长度,区别全角和半角，一个全角算二个长度，一个半角算一个长度
*/
export let stringLength = function (value, attrValue, vnode) {

	///[^\x00-\xff]/gi

	var reg_double = /[^\x00-\xff]/gi;
	var reg_single = /[\x00-\xff]/gi;

	var double = value.match(reg_double) || []
	var single = value.match(reg_single) || []

	return !(double.length * 2 + single.length > attrValue)

}


export let repeatIn = function (value, attrValue, vnode) {

	let _r = attrValue.filter((item) => {

		return item == value
	})
	return !(_r.length > 0)
}


export let filter_empty=function(value){
	
		if (value == null) {
			return '等待更新'
		} else {
			return value;
		}
	
}

function makeRatio(value){
	var _r = value.toString();
	var dotted = _r.indexOf(".")
	if(dotted<0){
		_r = _r+".00";
	}
	var _a = _r.split(".");	
	let _aa = _a[1].split("")
	let _result = _a[0]+"."+(_aa[0]||0)+(_aa[1]||0)
	return _result
}


export let img_ratio=function(value,attrvalue){

	
	value = value instanceof Array ? value : [value];
	var _rule_ratio = attrvalue.ratio||[];


	if (!_rule_ratio || _rule_ratio.length<=0 || value.length<=0) return true; //如果属性为空或未设置值，则取消验证
	
	let k = value.filter(x=>{
		var _ratio = makeRatio(x.width / x.height);
		var g =  _rule_ratio.filter(xx=>{
			return xx.toString()==_ratio.toString();
		})
		return g.length>0
	})


	return k.length==value.length
}


export let _url =function(value,attrValue){

	if(!value) return true

	if(value.length<=0) return true;

	let reg = /^http(s)?:\/\/.{3,}/

	return reg.test(value)


}


export let isAllSpace = function (value, attrValue){

	var reg =  /^[\s|　]*$/gi;

	return !reg.test(value)

}


export let facebookMedia=function(value,attrValue){

	if(!attrValue.fb) return true;

/*  	value.width=600;
	value.height=500

	console.log(value.width,value.height); */
	
	var _ratio = makeRatio(value.width/value.height);

	var _has_ratio=_.findIndex(attrValue.fb, { ration: _ratio });

	if (_has_ratio<0){
		//找到对应的比例
		_has_ratio = _.findIndex(attrValue.fb, { ration: 'any' });
	}
	//console.log(value.width,attrValue.fb[_has_ratio].minWidth, value.height, attrValue.fb[_has_ratio].minHeight)
/* 	console.log(_has_ratio)
	console.log(value.width,value.height)
	console.log(attrValue.fb[_has_ratio]) */
	return value.width >= attrValue.fb[_has_ratio].minWidth && value.height>=attrValue.fb[_has_ratio].minHeight

}

/* export let array_length=function(value,attrValue){

	if(!(value instanceof Array)) return false

	return value.length >= attrValue.min && value.length<=attrValue.max


} */

export let public_info=function(value,attrValue){

/* 	console.log(attrValue)
	console.log(value)
 */
	//是否设置了独立的信息

	if (value.is_single){

		if(value.info.fans==""){
			
			return false
		}else{
			
			return true
			
		}
		//没有设置独立的信息
	}else{
		//设置了公共信息
		if(attrValue){
			return true
			
		}else {
			return false;
		}

	}
	
	
}
import numeral from "numeral";

//千位分隔符
export let kiloBit=function(){

	var string = numeral(arguments[0]).format('0,0.00');

	return string

}

//千位分隔符,不保留二位小数
export let kiloBit2=function(){

	var string = numeral(arguments[0]).format('0,0');

	return string

}
//千位分隔符,保留一位小数
export let kiloBit1=function(){

	var string = numeral(arguments[0]).format('0,0.0');

	return string

}



export let formaFlag=function(value,_flag="$",_pos=0){

	if(_pos==0){

		return _flag+value

	}else{

		return value+_flag

	}

}


export let round2=function(){

	var string = numeral(arguments[0]).format('0.00');

	return string

}


export let round4=function(){

	var string = numeral(arguments[0]).format('0,0.0000');


	return  string
}
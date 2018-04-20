/*
* @Author: lenovo
* @Date:   2018-04-19 22:39:54
* @Last Modified by:   lenovo
* @Last Modified time: 2018-04-20 21:44:14
*/
require('page/common/nav-simple/index.js');
require('./index.css');
var _mm = require('util/mm.js');

//这里根据一个不同类型提示的参数来显示不同的内容
$(function(){
	var type = _mm.getUrlParam('type') || 'default',
		$element = $('.' + type + '-success');
	//显示对应的提示元素
	$element.show();
});
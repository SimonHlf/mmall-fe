/*
* @Author: lenovo
* @Date:   2018-04-17 12:11:31
* @Last Modified by:   lenovo
* @Last Modified time: 2018-04-17 12:44:34
*/
require('./index.css');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

//侧边导航
var navSide = {
	option : {
		name : '',
		navList : [
			{name : 'user-center' , desc : '个人中心' , href : './user-center.html'},
			{name : 'order-list' , desc : '我的订单' , href : './order-list.html'},
			{name : 'pass-update' , desc : '修改密码' , href : './pass-update.html'},
			{name : 'about' , desc : '关于MMall' , href : './about.html'}
		]
	},
	init : function(option){
		//init里面传参的option需要和默认的option进行合并
		$.extend(this.option, option);//浅拷贝
		this.renderNav();
	},
	//渲染导航菜单
	renderNav : function(){
		//对navList进行一个遍历，通过判断name是否一样然后增加active属性，通过hogan将其渲染成html
		//01:计算active数据
		var iLength = this.option.navList.length;
		for(var i = 0; i < iLength; i++){
			if(this.option.navList[i].name === this.option.name){
				//增加一个标记位
				this.option.navList[i].isActive = true;
			}
		}
		//02 渲染navList数据
		var navHtml = _mm.renderHtml(templateIndex,{
			navList : this.option.navList
		});
		//03:把html放入容器
		$(".nav-side").html(navHtml);
	}
}
module.exports = navSide;
/*
* @Author: lenovo
* @Date:   2018-04-16 10:17:41
* @Last Modified by:   lenovo
* @Last Modified time: 2018-04-17 10:43:34
*/
require('./index.css');

var _mm = require('util/mm.js');

//通用页面头部
var header = {
	init : function(){
		this.bindEvent();
	},
	onLoad : function(){
		var keyword = _mm.getUrlParam('keyword');
		//keyword存在，则回填输入框
		if(keyword){
			$("#search-input").val(keyword);
		}
	},
	bindEvent : function(){
		var _this = this;
		//做搜索提交
		$("#search-btn").click(function(){
			_this.searchSubmit();
		});
		//输入回车后做搜索提交
		$("#search-input").keyup(function(event) {
			if(event.keyCode === 13){//回车键
				_this.searchSubmit();
			}
		});
	},
	//搜索的提交
	searchSubmit : function(){
		var keyword = $.trim($("#search-input").val());
		//如果提交的时候存在keyword,正常跳转到list页面
		if(keyword){
			window.location.href = "./list.html?keyword=" + keyword;
		}else{
			//keyword为空，返回首页
			_mm.goHome();
		}
	}
};
header.init();
/*
* @Author: lenovo
* @Date:   2018-04-15 22:57:36
* @Last Modified by:   lenovo
* @Last Modified time: 2018-04-16 10:06:52
*/
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

var nav = {
	init : function(){
		this.bindEvent();
		this.loadUerInfo();
		this.loadCartCount();
		return this;
	},
	bindEvent : function(){
		//登录点击事件
		$(".js-login").click(function(){
			_mm.doLogin();
		});
		//注册点击事件
		$(".js-register").click(function(){
			window.location.href = "./register.html";
		});
		//退出点击事件
		$(".js-logout").click(function(){
			_user.logout(function(res){
				window.location.reload();
			},function(errMsg){
				_mm.errTips(errMsg);
			});
		});
	},
	//加载用户信息
	loadUerInfo : function(){
		_user.checkLogin(function(res){
			$(".user.not-login").hide().siblings('.user.login').show()
			.find('.username').text(res.username);
		},function(errMsg){
			//do nothing
		});
	},
	//加载购物车数量
	loadCartCount : function(){
		_cart.getCartCount(function(res){
			$(".nav .cart-count").text(res || 0);
		},function(errMsg){
			$(".nav .cart-count").text(0);
		});
	},
};
module.exports = nav.init();
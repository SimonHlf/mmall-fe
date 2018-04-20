/*
* @Author: lenovo
* @Date:   2018-04-16 09:39:08
* @Last Modified by:   lenovo
* @Last Modified time: 2018-04-16 10:07:53
*/
var _mm = require('util/mm.js');

var _user = {
	//登出
	logout : function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/logout.do'),
			method : 'POST',
			success : resolve,
			error : reject
		});
	},
	//检查登录状态
	checkLogin : function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('user/get_user_info.do'),
			method : 'POST',
			success : resolve,
			error : reject
		});
	}
};
module.exports = _user;
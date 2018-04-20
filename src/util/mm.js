var conf = {
	serverHost : ''
};
var Hogan = require('hogan');
var _mm = {
	//网络请求
	request : function(param){
		var _this = this;
		$.ajax({
			type : param.method || 'get',
			url : param.url || '',
			dataType : param.type || 'json',
			data : param.data || '',
			success : function(res){//请求的成功与否
				if(0 === res.status){//请求成功
					typeof param.success === 'function' && param.success(res.data,res.msg);
				}else if(10 === res.status){//没有登录状态，需要强制登录
					_this.doLogin();
				}else if(1 === res.status){//请求数据错误
					typeof param.error === 'function' && param.error(res.msg);
				}
			},
			error : function(err){
				typeof param.error === 'function' && param.error(err.statusText);
			}
		});
	},
	//获取后端服务器接口地址
	getServerUrl : function(path){
		return conf.serverHost + path;
	},
	//获取URL的参数
	getUrlParam : function(name){
		//01:happymmall.com/product/list?keyword=xx&&page=1
		//02:keyword=xx&&page=1 利用&&分开
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;

	},
	//渲染html模版
	renderHtml : function(htmlTemplate,data){
		//采用hogan组件 用法：先编译再渲染
		var template = Hogan.compile(htmlTemplate);
		var result = template.render(data);
		return result;
	},
	//通用成功提示
	successTips : function(msg){
		alert(msg || '操作成功');
	},
	//通用错误提示
	errorTips : function(msg){
		alert(msg || '哪里不对了吧');
	},
	//表单各种验证 支持非空判断 邮箱 手机号
	validate:function(value,type){
		var value = $.trim(value);
		//非空验证
		if('require' === type){
			return !!value;
		}
		//手机号验证
		if('phone' === type){
			return /^1\d{10}$/.test(value);
		}
		//邮箱格式验证
		if('email' === type){
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
	},
	//统一登录处理
	doLogin : function(){
		window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
	},
	//跳回主页
	goHome : function(){
		window.location.href = './index.html';
	}
};
module.exports = _mm;
/*
* @Author: lenovo
* @Date:   2018-04-16 09:55:00
* @Last Modified by:   lenovo
* @Last Modified time: 2018-04-16 09:56:26
*/
var _mm = require('util/mm.js');

var _cart = {
	getCartCount : function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('cart/get_cart_product_count.do'),
			success : resolve,
			error : reject
		});
	}
};
module.exports = _cart;
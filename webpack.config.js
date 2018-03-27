var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 环境变量配置，dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV)


//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
	return {
		//html原始模版
		template : './src/view/'+ name +'.html',
		//目标文件的位置
		filename : 'view/'+ name +'.html',
		inject : true,
		hash : true,
		//需要打包的模块
		chunks : ['common',name]
	}
}
//webpackConfig
var config = {
	//entry:'./src/page/index/index.js',
	entry : {
		'common': ['./src/page/common/index.js'],
		"index" : ['./src/page/index/index.js'],
		"login" : ['./src/page/login/index.js']
	},
	output : {
		//存放文件时的路径
		path:"./dist",
		//访问文件时的路径
		publicPath : '/dist',
		filename:'js/[name].js'
	},
	externals : {
		'jquery' : 'window.jQuery'
	},
	plugins : [
		//独立通用模块到js/base.js
		new webpack.optimize.CommonsChunkPlugin({
			name : 'common',
			filename : 'js/base.js'
		}),
		//把css单独打包到文件里面
		new ExtractTextPlugin('css/[name].css'),
		//html模版的处理
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('login')),

	],
	module : {
		loaders : [
			{
				test : /\.css$/,
				loader:ExtractTextPlugin.extract("style-loader","css-loader")
			},
			{
				test:/\.(gif|png|jpg|woff|svg|eot|ttf)\??.*/,
				loader:'url-loader?limit=100&name=resource/[name].[ext]'
			}
		]
	}
};
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;
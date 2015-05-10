var path = require('path');
//var later = require('later');
//var request = require('request');
//定义APP的根目录
global.APP_PATH = path.dirname(__dirname) + '/App';
//静态资源根目录
global.RESOURCE_PATH = __dirname;
//网站根目录
global.ROOT_PATH = __dirname;
//开启调试模式，线上环境需要关闭调试功能
global.APP_DEBUG = true;
//配置模板路径
global.VIEW_PATH = path.dirname(__dirname) + '/App/View/YiJia';
////定时器
//var sched = later.parse.recur().on(28).second();
//
//later.date.localTime();
//console.log("Now:"+new Date());
//t = later.setInterval(function() {
//  request('http://localhost:8210/admin/schedule/index', function(error, response, body) {
//    console.log(body);
//  })
//}, sched);

//加载thinkjs启动服务
require('thinkjs');

module.exports = {
  //配置项: 配置值
  port: 8210, //监听的端口
  db_type: 'mysql', // 数据库类型
  db_host: '127.0.0.1', // 服务器地址
  db_port: '', // 端口
  db_name: 'yidanke', // 数据库名
  db_user: 'root', // 用户名
  db_pwd: '', // 密码
  db_prefix: 'yi_', // 数据库表前缀
  url_route_on: true,
  url_resource_on: true,  //是否监听静态资源类请求
  url_resource_reg: /^(resource\/|static\/|assets\/|views\/|bower_components\/|styles\/|scripts\/|images\/|favicon\.ico|fonts\/|i18n\/|lib\/)/, //判断是否是静态资源的正则
};
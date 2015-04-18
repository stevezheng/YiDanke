var StatusService = thinkRequire('StatusService');

module.exports = Controller(function(){
  'use strict';
  return {
    init: function (http) {
      this.super("init", http);
    },
    __before: function () {
      var self = this;
      if(this.http.action === 'login'){
        return;
      }
      return this.session("cAdmin").then(function (cAdmin) {
        self.assign("StatusService", StatusService);
        //用户信息为空
        if (isEmpty(cAdmin)) {
          //ajax访问返回一个json的错误信息
          if (self.isAjax()) {
            return self.error(403, '登陆超时，请先登陆');
          } else {
            //跳转到登录页
            return self.redirect("/admin/index/login");
          }
        } else {
          //用户已经登录
          self.cAdmin = cAdmin;
          self.assign("cAdmin", cAdmin);
        }
      })
    }
  }
});
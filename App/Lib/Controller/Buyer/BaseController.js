module.exports = Controller(function(){
  'use strict';
  return {
    init: function (http) {
      this.super("init", http);
    },
    __before: function () {
      var self = this;
      return this.session("cUser").then(function (cUser) {
        //用户信息为空
        if (isEmpty(cUser)) {
          //ajax访问返回一个json的错误信息
          if (self.isAjax()) {
            return self.error(403, '登陆超时，请先登陆');
          } else {
            //跳转到登录页
            return self.redirect("/index/login");
          }
        } else {
          if (cUser.type != 0) {
            if (self.isAjax()) {
              return self.error(407, '该界面仅对买手开放');
            } else {
              self.assign('warning', '该界面仅对买手开放');
              return self.display("Home:index:warning");
            }
          }
        }
      })
    }
  }
});
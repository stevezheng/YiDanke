var StatusService = thinkRequire('StatusService');
var moment = require('moment');
module.exports = Controller(function(){
  'use strict';
  return {
    init: function (http) {
      this.super("init", http);
    },
    __before: function () {
      var self = this;
      //todo 后面两个需要删掉
      if(this.http.action === 'kuaiqianrecieve' || this.http.action === 'doTaskList' || this.http.action === 'doTaskDetail') {
        return false;
      }

      return this.session("cUser").then(function (cUser) {
        //用户信息为空
        if (isEmpty(cUser)) {
          //ajax访问返回一个json的错误信息
          if (self.isAjax()) {
            return self.error(403, '登陆超时，请先登陆');
          } else {
            //跳转到登录页
            return self.redirect("/");
          }
        } else {
          if (cUser.type != 1) {
            if (self.isAjax()) {
              return self.error(407, '该界面仅对商家开放');
            } else {
              self.assign('warning', '该界面仅对商家开放');
              return self.display("Home:index:warning");
            }
          }

          if (cUser.status != 2 && self.http.controller != 'Member' && self.http.controller != 'Money') {
            return self.redirect('/seller/member');
          }

          //用户已经登录
          self.cUser = cUser;
          self.assign("StatusService", StatusService);
          self.assign("cUser", cUser);
          self.assign("formatDate", function(_date) {
            return moment(_date).format('YYYY-MM-DD');
          });
        }
      })
    }
  }
});
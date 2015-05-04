var moment = require('moment');
module.exports = Controller("Admin/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '系统设置');

      if (self.isGet()) {
        return self.display();
      }

      if (self.isPost()) {
      }
    },

    editPasswordAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var oPassword = self.post('oPassword')
          , password = self.post('password');

        return D('admin')
          .where({id: self.cAdmin.id, password: md5(oPassword)})
          .find()
          .then(function(res) {
            if (!isEmpty(res)) {
              return D('admin')
                .where({id: self.cAdmin.id})
                .update({password: md5(password)})
                .then(function() {
                  return self.success('修改密码成功');
                })
            } else {
              return self.error(500, '旧密码不正确');
            }
          })
          .then(function() {
            return self.error(500, '修改密码失败');
          })
      }
    },
  };
});
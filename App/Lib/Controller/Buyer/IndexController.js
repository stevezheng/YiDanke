var UserModel = thinkRequire('UserModel');
module.exports = Controller("Buyer/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '个人中心');

      if (self.isGet()) {
        var user = UserModel();
        user.reloadCurrenUser(self)
          .then(function() {
            self.display();
          })
      }

      if (self.isPost()) {}
    },
    
    editPasswordAction: function() {
      var self = this;
      self.assign('title', '');
    
      if (self.isGet()) {}
      
      if (self.isPost()) {
        var user = UserModel();
        var oldPassword = self.post('oldPassword')
          , password = self.post('password');

        user
          .editPassword(self.cUser.id, oldPassword, password)
          .then(function() {
            return self.success('修改密码成功');
          })
          .catch(function(err) {
            return self.error(500, err.message);
          })
      }
    },

    editTradePasswordAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {}

      if (self.isPost()) {
        var user = UserModel();
        var oldPassword = self.post('oldPassword')
          , password = self.post('password');

        user
          .editTradePassword(self.cUser.id, oldPassword, password)
          .then(function() {
            return self.success('修改支付密码成功');
          })
          .catch(function(err) {
            return self.error(500, err.message);
          })
      }
    },

    addTradePasswordAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {}

      if (self.isPost()) {
        var user = UserModel();
        var password = self.post('password');

        user
          .addTradePassword(self.cUser.id, password)
          .then(function() {
            return self.success('添加支付密码成功');
          })
          .catch(function(err) {
            return self.error(500, err.message);
          })
      }
    },
  };
});
var UserModel = thinkRequire('UserModel');
var LogUserModel = thinkRequire('LogUserModel');

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
            //用户更新日志
            var logUser = LogUserModel();
            logUser.update(self.cUser.id, self.cUser.username, {tradePassword: '******'}, self.ip());

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
            //用户更新日志
            var logUser = LogUserModel();
            logUser.update(self.cUser.id, self.cUser.username, {tradePassword: '******'}, self.ip());
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
            //用户更新日志
            var logUser = LogUserModel();
            logUser.update(self.cUser.id, self.cUser.username, {tradePassword: '******'}, self.ip());

            return self.success('添加支付密码成功');
          })
          .catch(function(err) {
            return self.error(500, err.message);
          })
      }
    },

    editQQAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {}

      if (self.isPost()) {
        var user = UserModel();
        var qq = self.post('qq');

        user
          .editQQ(self.cUser.id, qq)
          .then(function() {
            //用户更新日志
            var logUser = LogUserModel();
            logUser.update(self.cUser.id, self.cUser.username, {qq: qq}, self.ip());

            return self.success('修改QQ成功');
          })
          .catch(function(err) {
            return self.error(500, err.message);
          })
      }
    },

    editPhoneAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {}

      if (self.isPost()) {
        var user = UserModel();
        var phone = self.post('phone');

        user
          .editPhone(self.cUser.id, phone)
          .then(function() {
            //用户更新日志
            var logUser = LogUserModel();
            logUser.update(self.cUser.id, self.cUser.username, {phone: phone}, self.ip());

            return self.success('修改手机号成功');
          })
          .catch(function(err) {
            return self.error(500, err.message);
          })
      }
    },
  };
});
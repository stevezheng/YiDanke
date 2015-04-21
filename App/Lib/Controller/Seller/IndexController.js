var UserModel = thinkRequire('UserModel');
var TaskModel = thinkRequire('TaskModel');
var logUser = thinkRequire('LogUserModel')();
var _ = require('underscore');

module.exports = Controller("Seller/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '个人中心');
      var count = 0;

      if (self.isGet()) {
        var user = UserModel();
        var task = TaskModel();
        user.reloadCurrentUser(self)
          .then(function () {
            return task
              .countPcDoing(self.cUser.id)
          })
          .then(function (sum) {
            count += sum;

            return task
              .countPhoneDoing(self.cUser.id)
          })
          .then(function (sum) {
            count += sum;
          })
          .then(function () {
            return task
              .pass(self.cUser.id)
          })
          .then(function (res) {
            var money = 0;
            var promiseMoney = 0;
            if (!isEmpty(res)) {
              for (var i = 0; i < res.length; i++) {
                var obj = res[i];
                money += obj.taskTotalMoney * (obj.taskPcDoingCount + obj.taskPhoneDoingCount);
                promiseMoney += obj.taskPromise * (obj.taskPcDoingCount + obj.taskPhoneDoingCount);
              }
            }

            self.assign('money', money);
            self.assign('promiseMoney', promiseMoney);
            self.assign('count', count);
            self.display();
          })
          .catch(function(err) {
            console.error(err.stack);
          })
      }

      if (self.isPost()) {}
    },

    getOneAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {}

      if (self.isPost()) {
        var user = UserModel();

        user
          .getOne(self.cUser.id)
          .then(function(res) {
            return self.success({money: res.money, coin: res.coin, pv: res.pv});
          })
          .catch(function(err) {
            return self.error(500, err);
          })
      }
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
            logUser.update(self.cUser.id, self.cUser.username, {password: '******'}, self.ip());
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
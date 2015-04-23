var moment = require('moment');
var UserModel = thinkRequire('UserModel');
var user = UserModel();
module.exports = Controller("Admin/BaseController", function(){
  "use strict";
  return {
    buyerAction: function() {
      var self = this;
      self.assign('title', '个人中心');

      if (self.isGet()) {
        return self.display();
      }

      if (self.isPost()) {
        var page = self.post('page');

        return D('user')
          .order('id desc')
          .page(page, 20)
          .where({type: 0})
          .countSelect()
          .then(function(res) {
            return self.success(res);
          })
      }
    },

    sellerAction: function() {
      var self = this;
      self.assign('title', '个人中心');

      if (self.isGet()) {
        return self.display();
      }

      if (self.isPost()) {
        var page = self.post('page');

        return D('user')
          .order('id desc')
          .page(page, 20)
          .where({type: 1})
          .countSelect()
          .then(function(res) {
            return self.success(res);
          })
      }
    },
    
    moneyAction: function() {
      var self = this;
      self.assign('title', '');
    
      if (self.isGet()) {}
      
      if (self.isPost()) {
        var id = self.post('id')
          , type = self.post('type')
          , money = self.post('money');
        if (type == 'add') {
          return user
            .addMoney(id, money)
            .then(function(res) {
              return self.success('操作成功');
            })
        }

        if (type == 'sub') {
          return user
            .subMoney(id, money)
            .then(function(res) {
              return self.success('操作成功');
            })
        }
      }
    },

    coinAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {}

      if (self.isPost()) {
        var id = self.post('id')
          , type = self.post('type')
          , coin = self.post('coin');
        if (type == 'add') {
          return user
            .addMoney(id, coin)
            .then(function(res) {
              return self.success('操作成功');
            })
        }

        if (type == 'sub') {
          return user
            .subMoney(id, coin)
            .then(function(res) {
              return self.success('操作成功');
            })
        }
      }
    },
  };
});
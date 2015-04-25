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
            .addCoin(id, coin)
            .then(function(res) {
              return self.success('操作成功');
            })
        }

        if (type == 'sub') {
          return user
            .subCoin(id, coin)
            .then(function(res) {
              return self.success('操作成功');
            })
        }
      }
    },

    passwordAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {}

      if (self.isPost()) {
        var id = self.post('id')
          , type = self.post('type')
          , password = self.post('password');
        if (type == 'password') {
          return D('user')
            .where({id: id})
            .update({'password': md5(password)})
            .then(function(res) {
              return self.success('修改密码成功');
            })
        }

        if (type == 'tradepassword') {
          return D('user')
            .where({id: id})
            .update({'tradePassword': md5(password)})
            .then(function(res) {
              return self.success('修改支付密码成功');
            })
        }
      }
    },
    
    memberAction: function(oldVipExprie) {
      var self = this;
      self.assign('title', '');
    
      if (self.isGet()) {}
      
      if (self.isPost()) {
        var id = self.post('id')
          , oldVipExprie = self.post('oldVipExprie');

        var exprie;
        var _vipExprie = oldVipExprie;
        var vipExprie = moment().diff(_vipExprie, 'days');
        if (vipExprie < 0) {
          //尚未到期
          exprie = _vipExprie;
        } else {
          //已经到期
          exprie = moment();
        }

        var newExprie = moment(exprie).add(3, 'M').format('YYYY-MM-DD HH:mm:ss');

        return D('user')
          .where({id: id})
          .update({vipExprie: newExprie, status: 2})
          .then(function(res) {
            return self.success('增加3个月会员成功');
          })
      }
    },
  };
});
var moment = require('moment');
var _ = require('underscore');
var UserModel = thinkRequire('UserModel');
var Log = thinkRequire('LogService');
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
        var page = self.post('page')
          , data = self.post('data') || {};

        var data = _.mapObject(data, function(val, key) {
          return ['like', '%' + val + '%'];
        });

        data.type = 0;

        return D('user')
          .order('id desc')
          .page(page, 20)
          .where(data)
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
        var page = self.post('page')
          , data = self.post('data') || {};

        var data = _.mapObject(data, function(val, key) {
          return ['like', '%' + val + '%'];
        });

        data.type = 1;

        return D('user')
          .order('id desc')
          .page(page, 20)
          .where(data)
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
          , cUser = self.post('user')
          , money = self.post('money');
        if (type == 'add') {
          return user
            .addMoney(id, money)
            .then(function() {
              return Log.money(
                1
                , money
                , (cUser.money + money)
                , cUser.id
                , cUser.username
                , 0
                , self.ip()
                , '通过管理员充值' + money + '元'
              )
            })
            .then(function(res) {
              return self.success('操作成功');
            })
        }

        if (type == 'sub') {
          return user
            .subMoney(id, money)
            .then(function() {
              return Log.money(
                -1
                , money
                , (cUser.money - money)
                , cUser.id
                , cUser.username
                , 0
                , self.ip()
                , '通过管理员扣款' + money + '元'
              )
            })
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
          , cUser = self.post('user')
          , coin = self.post('coin');
        if (type == 'add') {
          return user
            .addCoin(id, coin)
            .then(function() {
              return Log.coin(
                1
                , coin
                , (cUser.coin + coin)
                , cUser.id
                , cUser.username
                , 0
                , self.ip()
                , '通过管理员充值' + coin + '金币'
              )
            })
            .then(function(res) {
              return self.success('操作成功');
            })
        }

        if (type == 'sub') {
          return user
            .subCoin(id, coin)
            .then(function() {
              return Log.coin(
                -1
                , coin
                , (cUser.coin - coin)
                , cUser.id
                , cUser.username
                , 0
                , self.ip()
                , '通过管理员扣款' + coin + '金币'
              )
            })
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
          , username = self.post('username')
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
          .then(function() {
            return Log.member(
              1
              , 0
              , ''
              , id
              , username
              , 0
              , self.ip()
              , '管理员开通VIP会员3个月,有效期至' + newExprie
            );
          })
          .then(function(res) {
            return self.success('增加3个月会员成功');
          })
      }
    },
  };
});
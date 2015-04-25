var moment = require('moment');
var Log = thinkRequire('LogService');
var _ = require('underscore');
module.exports = Controller("Admin/BaseController", function(){
  "use strict";
  return {
    inAction: function() {
      var self = this;
      self.assign('title', '充值');

      if (self.isGet()) {
        return self.display();
      }

      if (self.isPost()) {
        var page = self.post('page')
          , data = self.post('data') || {};

        var data = _.mapObject(data, function(val, key) {
          return ['like', '%' + val + '%'];
        });
        

        if (data.username) {
          data['yi_user.username'] = data.username;
          delete data.username;
        }

        if (data.id) {
          data['yi_money.id'] = data.id;
          delete data.id;
        }
        
        return D('money')
          .field(['yi_money.*', 'yi_user.username'])
          .join({
            table: 'user'
            , join: 'left'
            , on: {
              'moneyUserId': 'id'
            }
          })
          .order('id desc')
          .page(page, 20)
          .where(data)
          .countSelect()
          .then(function(res) {
            return self.success(res);
          })
      }
    },

    passInAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var id = self.post('id');
        return D('money')
          .where({id: id})
          .find()
          .then(function(money) {
            if (money.moneyStatus == 0) {
              var data = {};
              D('user')
                .where({id: money.moneyUserId})
                .find()
                .then(function(cUser) {
                  if (money.moneyType == 0) {
                    //金币
                    data.coin = ['exp', 'coin+' + money.moneyValue];

                   Log.money(
                      1
                      , money.moneyValue
                      , (cUser.money + money.moneyValue)
                      , cUser.id
                      , cUser.username
                      , 1
                      , self.ip()
                      , '通过支付宝充值' + money.moneyValue + '元');

                  } else if (money.moneyType == 1) {
                    //押金
                    data.money = ['exp', 'money+' + money.moneyValue];

                    Log.coin(
                      1
                      , money.moneyValue
                      , (cUser.coin + money.moneyValue)
                      , cUser.id
                      , cUser.username
                      , 1
                      , self.ip()
                      , '通过支付宝充值' + money.moneyValue + '金币');
                  }
                  return D('user')
                    .where({id: money.moneyUserId})
                    .update(data);
                })
            } else {
              return self.error(500, '请勿重复审核');
            }
          })
          .then(function() {
            return D('money')
              .where({id: id})
              .update({moneyStatus: 1})
          })
          .then(function() {
            return self.success('通过审核成功');
          })
          .catch(function(err) {
            return self.error(500, '通过审核失败', err);
          })
      }
    },

    unpassInAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var id = self.post('id');
        return D('money')
          .where({id: id})
          .update({moneyStatus: -1})
          .then(function() {
            return self.success('拒绝通过成功');
          })
          .catch(function(err) {
            return self.error(500, '拒绝通过失败', err);
          })
      }
    },

    outAction: function() {
      //todo: 这里要新建表
      var self = this;
      self.assign('title', '提现');

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
  };
});
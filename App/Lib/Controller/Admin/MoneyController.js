var moment = require('moment');
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
        var page = self.post('page');

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
              if (money.moneyType == 0) {
                //金币
                data.coin = ['exp', 'coin+' + money.moneyValue];
              } else if (money.moneyType == 1) {
                //押金
                data.money = ['exp', 'money+' + money.moneyValue];
              }
              return D('user')
                .where({id: money.moneyUserId})
                .update(data);
              //todo: 打日志
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
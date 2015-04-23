var ShopModel = thinkRequire('ShopModel');
var TaskModel = thinkRequire('TaskModel');
var UserModel = thinkRequire('UserModel');
var run = thinkRequire('CrazyClickService');

module.exports = Controller("Publish/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '支付');

      if (self.isGet()) {
      }

      if (self.isPost()) {
        var taskId = self.post('taskId')
          , payPV = self.post('payPV') || 0
          , payCoin = self.post('payCoin') || 0
          , payMoney = self.post('payMoney') || 0;

        var user = UserModel();
        var task = TaskModel();

        return user
          .getOne(self.cUser.id)
          .then(function(res) {
            if (payCoin > res.coin) {
              return self.error(500, '金币不足，无法支付');
            }

            if (payMoney > res.money) {
              return self.error(500, '金币不足，无法支付');
            }

            if (payPV > res.pv) {
              return self.error(500, '流量不足，无法支付');
            }

            if (payCoin > 0) {
              return user
                .subCoin(self.cUser.id, payCoin)
            }
          })
          .then(function() {
            if (payMoney > 0) {
              return user
                .subMoney(self.cUser.id, payMoney)
            }
          })
          .then(function() {
            if (payPV > 0) {
              return user
                .subPV(self.cUser.id, payPV)
            }
          })
          .then(function() {
            return task
              .pay(self.cUser.id, taskId)
          })
          .then(function() {
            return task
              .getOwnOne(self.cUser.id, taskId)
          })
          .then(function(res) {
            var shopPlatform = res.taskPlatform;
            if (shopPlatform == 'taobao' || shopPlatform == 'tmall') {
              run(shopPlatform, res);
            }
            return self.success('支付成功');
          })
          .catch(function(err) {
            console.error(err.stack);
            return self.error(500, '支付失败');
          })
      }
    },
  };
});
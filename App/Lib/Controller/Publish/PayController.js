var ShopModel = thinkRequire('ShopModel');
var TaskModel = thinkRequire('TaskModel');
var UserModel = thinkRequire('UserModel');

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
          , payCoin = self.post('payCoin')
          , payMoney = self.post('payMoney');

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

            return user
              .subCoin(self.cUser.id, payCoin)
          })
          .then(function() {
            return user
              .subMoney(self.cUser.id, payMoney)
          })
          .then(function() {
            return task
              .pay(self.cUser.id, taskId)
          })
          .then(function() {
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
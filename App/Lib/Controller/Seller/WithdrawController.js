var UserModel = thinkRequire('UserModel');
var DoTaskModel = thinkRequire('DoTaskModel');
var WithdrawModel = thinkRequire('WithdrawModel');
var Log = thinkRequire('LogService');
module.exports = Controller("Seller/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '提现管理');

      if (self.isGet()) {
        self.display();
      }

      if (self.isPost()) {
        return D('bank')
          .where({bankUserId: self.cUser.id})
          .select()
          .then(function(res) {
            return self.success(res);
          })
      }
    },

    tenpayAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var data = {};
        data.bankRealName = self.post('bankRealName');
        data.bankAccount = self.post('bankAccount');
        data.bankImage = self.post('bankImage');
        data.bankUserId = self.cUser.id;
        data.bankType = 1; //1:财付通，2：支付宝，3：银行
        data.bankStatus = 0;

        return D('bank')
          .thenAdd(data, {bankType: 1, bankUserId: self.cUser.id}, true)
          .then(function() {
            return self.success('提交成功，请耐心等待审核');
          });
      }
    },

    alipayAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var data = {};
        data.bankRealName = self.post('bankRealName');
        data.bankAccount = self.post('bankAccount');
        data.bankImage = self.post('bankImage');
        data.bankUserId = self.cUser.id;
        data.bankType = 2; //1:财付通，2：支付宝，3：银行
        data.bankStatus = 0;

        return D('bank')
          .thenAdd(data, {bankType: 2, bankUserId: self.cUser.id}, true)
          .then(function() {
            return self.success('提交成功，请耐心等待审核');
          });
      }
    },

    bankAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var data = {};
        data.bankRealName = self.post('bankRealName');
        data.bankName = self.post('bankName');
        data.bankAccount = self.post('bankAccount');
        data.bankImage = self.post('bankImage');
        data.bankUserId = self.cUser.id;
        data.bankType = 3; //1:财付通，2：支付宝，3：银行
        data.bankStatus = 0;

        return D('bank')
          .thenAdd(data, {bankType: 3, bankUserId: self.cUser.id}, true)
          .then(function() {
            return self.success('提交成功，请耐心等待审核');
          });
      }
    },

    dotasksAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var dotask = DoTaskModel();

        return dotask
          .getWithdrawByBuyer(self.cUser.id)
          .then(function(res) {
            return self.success(res);
          })
      }
    },

    withdrawCoinAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var tradePassword = self.post('tradePassword')
          , bankId = self.post('bankId')
          , coin = self.post('coin');

        var withdraw = WithdrawModel();
        var user = UserModel();

        coin = Math.abs(coin);

        return D('user')
          .where({id: self.cUser.id, tradePassword: md5(tradePassword)})
          .find()
          .then(function(res) {
            if (!isEmpty(res)) {
              if (res.coin < coin) {
                return self.error(500, '余额不足!');
              } else {
                return user
                  .subCoin(self.cUser.id, coin)
              }
            } else {
              return self.error(500, '支付密码错误');
            }
          })
          .then(function() {
            return withdraw
              .addOne(self.cUser.id, bankId, 0, coin, '', '')
          })
          .then(function() {
            return Log
              .coin(
              -1
              , coin
              , (self.cUser.coin - coin)
              , self.cUser.id
              , self.cUser.username
              , 1
              , self.ip()
              , '申请提现金币冻结' + coin + '金币'
            )
          })
          .then(function() {
            return user
              .reloadCurrentUser(self)
          })
          .then(function() {
            return self.success('申请提现成功，请耐心等待工作人员为您处理申请');
          })
      }
    },

    withdrawMoneyAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var tradePassword = self.post('tradePassword')
          , bankId = self.post('bankId')
          , money = self.post('money');

        var withdraw = WithdrawModel();
        var user = UserModel();

        money = Math.abs(money);

        return D('user')
          .where({id: self.cUser.id, tradePassword: md5(tradePassword)})
          .find()
          .then(function(res) {
            if (!isEmpty(res)) {
              if (res.money < money) {
                return self.error(500, '余额不足!');
              } else {
                return user
                  .subMoney(self.cUser.id, money)
              }
            } else {
              return self.error(500, '支付密码错误');
            }
          })
          .then(function() {
            return withdraw
              .addOne(self.cUser.id, bankId, 1, money, '', '')
          })
          .then(function() {
            return Log
              .money(
              -1
              , money
              , (self.cUser.money - money)
              , self.cUser.id
              , self.cUser.username
              , 1
              , self.ip()
              , '申请提现押金冻结' + money + '元'
            )
          })
          .then(function() {
            return user
              .reloadCurrentUser(self)
          })
          .then(function() {
            return self.success('申请提现成功，请耐心等待工作人员为您处理申请');
          })
      }
    }
  };
});

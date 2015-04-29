/**
 * controller
 * @return 
 */
module.exports = Controller("Buyer/BaseController", function(){
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
  };
});
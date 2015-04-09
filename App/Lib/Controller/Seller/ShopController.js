var AccountModel = thinkRequire('AccountModel');
var _ = require('underscore');

module.exports = Controller("Seller/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '绑定账号');

      if (self.isGet()) {
        var account = AccountModel();

        account
          .all(self.cUser.id)
          .then(function(res) {
            var taobaoAccounts = _.where(res, {accountPlatform: 'taobao'});
            var tmallAccounts = _.where(res, {accountPlatform: 'tmall'});
            var jdAccounts = _.where(res, {accountPlatform: 'jd'});
            self.assign('statusMap', {
              '0': '待审核'
              , '1': '已通过'
              , '2': '已拒绝'
            });
            self.assign('taobaoAccounts', taobaoAccounts);
            self.assign('tmallAccounts', tmallAccounts);
            self.assign('jdAccounts', jdAccounts);
            self.display();
          });
      }

      if (self.isPost()) {}
    },
    
    getOneAction: function() {
      var self = this;
      self.assign('title', '');
    
      if (self.isGet()) {
        var account = AccountModel();
        var id = self.get('id');

        account
          .getOne(self.cUser.id, id)
          .then(function(res) {
            self.success(res);
          })
          .catch(function (err) {
            self.error(500, err.message);
          })
      }
      
      if (self.isPost()) {}
    },

    addAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var accountName = self.post('accountName')
          , accountRealName = self.post('accountRealName')
          , accountProvince = self.post('accountProvince')
          , accountCity = self.post('accountCity')
          , accountArea = self.post('accountArea')
          , accountAddress = self.post('accountAddress')
          , accountPhone = self.post('accountPhone')
          , accountPlatform = self.post('accountPlatform');

        var account = AccountModel();

        account
          .addOne(self.cUser.id, accountName, accountRealName, accountProvince , accountCity, accountArea, accountAddress , accountPhone, accountPlatform)
          .then(function(res) {
            return self.success('添加账号成功');
          })
          .catch(function(err) {
            var data = JSON.parse(err.json_message);
            return self.error(500, '添加账号失败', data);
          })
      }
    },

    editAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {

        var accountName = self.post('accountName')
          , accountRealName = self.post('accountRealName')
          , accountProvince = self.post('accountProvince')
          , accountCity = self.post('accountCity')
          , accountArea = self.post('accountArea')
          , accountAddress = self.post('accountAddress')
          , accountPhone = self.post('accountPhone')
          , accountPlatform = self.post('accountPlatform')
          , id = self.post('id');

        var account = AccountModel();

        account
          .editOne(self.cUser.id, id, accountName, accountRealName, accountProvince , accountCity, accountArea, accountAddress , accountPhone, accountPlatform)
          .then(function(res) {
            return self.success('编辑账号成功');
          })
          .catch(function(err) {
            var data = JSON.parse(err.json_message);
            return self.error(500, '编辑账号失败', data);
          })
      }
    },
  };
});
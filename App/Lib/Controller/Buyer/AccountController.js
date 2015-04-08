var AccountModel = thinkRequire('AccountModel');
module.exports = Controller("Buyer/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '绑定账号');

      if (self.isGet()) {
        self.display();
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
            self.success('添加账号成功');
          })
          .catch(function(err) {
            self.error(500, err.message);
          })
      }
    },
  };
});
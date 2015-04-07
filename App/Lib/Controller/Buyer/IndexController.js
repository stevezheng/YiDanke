var UserModel = thinkRequire('UserModel');
module.exports = Controller("Buyer/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '个人中心');

      if (self.isGet()) {
        self.display();
      }

      if (self.isPost()) {}
    },
    
    editPasswordAction: function() {
      var self = this;
      self.assign('title', '');
    
      if (self.isGet()) {}
      
      if (self.isPost()) {
        var user = UserModel();
        var oldPassword = self.post('oldPassword')
          , password = self.post('password');

        user
          .editPassword(self.cUser.id, oldPassword, password)
          .then(function() {
            return self.success('修改密码成功');
          })
          .catch(function(err) {
            return self.error(500, err.message);
          })
      }
    },
  };
ss});
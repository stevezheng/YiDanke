var UserModel = thinkRequire('UserModel');
module.exports = Controller("Home/BaseController", function(){
  "use strict";
  return {
    indexAction: function(){
      this.display();
    },

    regAction: function() {
      var self = this;
      self.assign('title', '用户注册');

      if (self.isGet()) {
        self.display();
      }

      if (self.isPost()) {
        var username = self.post('username')
          , password = self.post('password')
          , email = self.post('email')
          , qq = self.post('qq')
          , phone = self.post('phone')
          , type = self.post('type')
          , province = self.post('province')
          , city = self.post('city')
          , area = self.post('area');
        
        console.log(username);
        
        var user = UserModel();
        user
          .reg(username, password, email, qq, phone, type, province, city, area)
          .then(function(res) {
            if (res.type == 'exist') {
              self.success('exist');
            } else if (res.type == 'add') {
              self.success(res.id);
            }
          })
          .catch(function(err) {
            self.error(err);
          })
      }
    },
    
    checkAction: function() {
      var self = this;
      self.assign('title', '');
    
      if (self.isGet()) {

      }
      
      if (self.isPost()) {
        return self.success();
      }
    },
  };
});
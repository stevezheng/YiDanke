module.exports = Controller("Admin/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '个人中心');

      if (self.isGet()) {
        return self.display();
      }

      if (self.isPost()) {}
    },
    
    loginAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {
        self.display();
      }
      
      if (self.isPost()) {
        var username = self.post('username').trim() || ''
          , password = self.post('password').trim() || '';

        var admin = D('admin');

        admin
          .where({
            username: username
            , password: md5(password)
          })
          .find()
          .then(function (data) {
            if (isEmpty(data)) {
              return self.error(500, '账号密码不正确');
            } else {
              self.session('cAdmin', data);

              //登陆成功
              return self.success('登陆成功');
            }
          })
          .catch(function(err) {
            //登陆失败
            return self.error(500, '登陆失败', err);
          })
      }
    },
  };
});
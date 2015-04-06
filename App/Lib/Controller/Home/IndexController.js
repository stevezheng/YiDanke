var UserModel = thinkRequire('UserModel');
module.exports = Controller("Home/BaseController", function () {
  "use strict";
  return {
    indexAction: function () {
      var self = this;
      self.assign('title', '用户登陆');

      if (self.isGet()) {
        self.display();
      }

      if (self.isPost()) {
        var username = self.post('username').trim() || ''
          , password = self.post('password').trim() || '';

        var user = UserModel();

        user
          .login(username, password)
          .then(function (data) {
            if (isEmpty(data)) {
              return self.error(500, '账号密码不正确');
            } else {
              self.session('cUser', data);
              var route = data.type == 0 ? '/buyer' : '/seller';
              return self.success(route);
            }
          })
          .then(function () {
            return self.redirect('/index/login');
          })
      }
    },

    regAction: function () {
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
          .then(function (res) {
            if (res.type == 'exist') {
              self.success('exist');
            } else if (res.type == 'add') {
              self.success(res.id);
            }
          })
          .catch(function (err) {
            self.error(err);
          })
      }
    },

    logoutAction: function () {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {
        self
          .session()
          .then(function () {
            self.redirect('/');
          })
      }

      if (self.isPost()) {
      }
    },

    checkAction: function () {
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
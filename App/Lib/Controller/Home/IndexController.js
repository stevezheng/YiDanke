var UserModel = thinkRequire('UserModel');
var LogUserModel = thinkRequire('LogUserModel');

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

              var ip = self.ip();

              //更新登陆信息
              user
                .updateLoginData(data.id, ip)
                .then(function() {
                  //登陆日志
                  var logUser = LogUserModel();
                  logUser.login(data.id, data.username, ip);

                  //登陆成功
                  return self.success(route);
                });
            }
          })
          .catch(function(err) {
            //登陆失败
            var data = JSON.parse(err.json_message);
            return self.error(500, '登陆失败', data);
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

        var user = UserModel();
        user
          .reg(username, password, email, qq, phone, type, province, city, area)
          .then(function (res) {
            if (res.type == 'exist') {
              self.success('exist');
            } else if (res.type == 'add') {
              //注册日志
              var logUser = LogUserModel();
              logUser.reg(res.id, username, ip);

              self.success(res.id);
            }
          })
          .catch(function (err) {
            var data = JSON.parse(err.json_message);
            return self.error(500, '注册失败', data);
          })
      }
    },

    logoutAction: function () {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {
        return self
          .session()
          .then(function () {
            //退出日志
            var logUser = LogUserModel();

            if (self.cUser) {
              logUser.logout(self.cUser.id, self.cUser.username, ip);
            }

            return self.redirect('/');
          })
          .catch(function(err) {
            console.error(err.message);
            console.error(err.stack);
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
        var type = self.post('type');

        if (type == 'qq') {
          var qq = self.post('qq');

          return D('user')
            .where({'qq': qq})
            .find()
            .then(function (data) {
              if (!isEmpty(data)) {
                return false;
              } else {
                return true;
              }
            })
            .then(function (result) {
              if (result) {
                return self.success();
              } else {
                return self.error(300, '该QQ已存在');
              }
            })
        }
        if (type == 'useremail') {
          var email = self.post('useremail');
          return D('user')
            .where({'email': email})
            .find()
            .then(function (data) {
              if (!isEmpty(data)) {
                return false;
              } else {
                return true;
              }
            })
            .then(function (result) {
              if (result) {
                return self.success();
              } else {
                return self.error(300, '该邮箱已存在');
              }
            })
        }

        if (type == 'phone') {
          var phone = self.post('phone');
          return D('user')
            .where({'phone': phone})
            .find()
            .then(function (data) {
              if (!isEmpty(data)) {
                return false;
              } else {
                return true;
              }
            })
            .then(function (result) {
              if (result) {
                return self.success();
              } else {
                return self.error(300, '该手机已存在');
              }
            })
        }
        if (type == 'username') {
          var username = self.post('username');
          return D('user')
            .where({'username': username})
            .find()
            .then(function (data) {
              if (!isEmpty(data)) {
                return false;
              } else {
                return true;
              }
            })
            .then(function (result) {
              if (result) {
                return self.success();
              } else {
                return self.error(300, '该用户名已存在');
              }
            })
        }
      }
    },
  };
});
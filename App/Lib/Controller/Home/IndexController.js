var UserModel = thinkRequire('UserModel');
var LogUserModel = thinkRequire('LogUserModel');

module.exports = Controller("Home/BaseController", function () {
  "use strict";
  return {
    indexAction: function () {
      var self = this;
      self.assign('title', '用户登陆');

      if (self.isGet()) {
        return self.display();
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
        var ip = self.ip();
        user
          .reg(username, password, email, qq, phone, type, province, city, area)
          .then(function (res) {
            if (res.type == 'exist') {
              return self.success('exist');
            } else {
              //注册日志
              var logUser = LogUserModel();
              logUser.reg(res.id, username, ip)
                .then(function() {
                  return self.success(res.id);
                })
                .catch(function(err) {
                  console.error(err);
                  return self.error(err);
                })
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
      var ip = self.ip();

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

    uploadAction: function () {
      this.header("Content-Type", "text/html");
      var _this = this;
      var maxsize = 1024 * 1024 * 3; //文件大小限制
      var file = this.file("file"); //三个重要属性 originalFilename,path,size
      var fs = thinkRequire('fs'); //引入fs处理文件
      var ext = file.path.split('.');
      ext = ext[ext.length - 1];
      if (!isImg(ext)) {
        fs.unlinkSync(file.path); //不是图片文件的从临时目录删除
        return this.json({
          code: 0,
          msg: '请上传图片文件!'
        });
      }
      if (file.size > maxsize) {
        fs.unlinkSync(file.path); //超过大小的文件从临时目录删除
        return this.json({
          code: 0,
          msg: '请上传' + maxsize + 'bytes大小内的文件!'
        });
      }

      var filename = md5(file.originalFilename).substr(0, 5) + '_' + guid() + '.' + ext;

      var dir = RESOURCE_PATH + '/resource/uploads/' + new Date().getFullYear() + (new Date().getMonth() + 1);
      if (!isDir(dir)) {
        mkdir(dir, '0755');
      }
      var targetfile = dir + '/' + filename;
      fs.rename(file.path, targetfile, function (err) {
        if (err) {
          _this.json({
            code: 0,
            msg: '上传失败'
          });
        } else {
          _this.json({
            code: 1,
            msg: '上传成功',
            filename: targetfile.replace(RESOURCE_PATH, ''),
            fileext: ext,
            filesize: file.size
          });
        }
      });
      return false;
    },
  };
});
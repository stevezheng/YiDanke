var util = require('util');
var moment = require('moment');

module.exports = Model(function() {
  return {
    login: function(userId, userUsername, userIP) {
      var self = this;

      return self
        .add({
          logUserId: userId
          , logUserIp: userIP
          , logUserType: 1
          , logUserComment: util.format('用户:%s,于%s登陆系统', userUsername, moment().format('YYYY-MM-DD HH:mm:ss'))
        })
    },

    reg: function(scope) {
      var self = this;

      return self
        .getUser(scope.cUser.id)
        .then(function(cUser) {
          scope.assign("cUser", cUser);
          return scope.session('cUser', cUser);
        })
    },

    update: function(username, password, email, qq, phone, type, province, city, area) {
      var self = this;
      return self
        .thenAdd({
          username: username
          , password: md5(password)
          , email: email
          , qq: qq
          , phone: phone
          , type: type
          , province: province
          , city: city
          , area: area
        }, {
          username: username
          , email: email
          , qq: qq
          , phone: phone
        }, true)
    },

    del: function(scope) {
      var self = this;

      return self
        .getUser(scope.cUser.id)
        .then(function(cUser) {
          scope.assign("cUser", cUser);
          return scope.session('cUser', cUser);
        })
    },
  }
});
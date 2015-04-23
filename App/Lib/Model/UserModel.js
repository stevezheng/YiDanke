var moment = require('moment');
var pvMap = {
  1000: 5000
  , 2000: 11428
  , 5000: 33333
  , 10000: 80000
  , 20000: 200000
};

module.exports = Model(function() {
  return {
    fields: {
      'username': {
        valid: ['required', 'length']
        , length_args: [6, 30]
        , msg: {
          required: '用户名不能为空',
          length: '用户名长度为6-30个字符'
        }
      },
      'qq': {
        valid: ['required']
        , msg: {
          required: 'qq不能为空'
        }
      },
      'phone': {
        valid: ['required', 'mobile']
        , msg: {
          required: '手机不能为空'
          , mobile: '手机格式不正确'
        }
      },
      'email': {
        valid: ['required', 'email']
        , msg: {
          required: '邮箱不能为空'
          , email: '邮箱格式不正确'
        }
      },
      'password': {
        valid: ['required']
        , msg: {
          required: '密码不能为空'
        }
      },
      'type': {
        valid: ['required']
        , msg: {
          required: '用户类型不能为空'
        }
      },
      'province': {
        valid: ['required']
        , msg: {
          required: '省份不能为空'
        }
      },
      'city': {
        valid: ['required']
        , msg: {
          required: '城市不能为空'
        }
      },
      'area': {
        valid: ['required']
        , msg: {
          required: '地区不能为空'
        }
      }
    },

    /**
     * 获取用户信息
     * @param id 用户id
     * @returns {*}
     */
    getUser: function(id) {
      var self = this;

      return self
        .where({id: id})
        .find()
    },

    /**
     * 获取用户信息
     * @param id 用户id
     * @returns {*}
     */
    getOne: function(id) {
      var self = this;

      return self
        .where({id: id})
        .find()
    },

    updateMember: function(id, coin, exprie) {
      var self = this;

      return self
        .where({id: id})
        .update({coin: ['exp', 'coin-' + Math.abs(coin)], vipExprie: exprie, status: 2})
    },

    /**
     * 更新cUser的session
     * @param scope action中的this
     * @returns {*}
     */
    reloadCurrentUser: function(scope) {
      var self = this;

      //todo: 这里最好多个判断用户是否会员过期的功能
      return self
        .getUser(scope.cUser.id)
        .then(function(cUser) {
          scope.assign("cUser", cUser);
          return scope.session('cUser', cUser);
        })
    },

    /**
     * 注册用户
     * @param username
     * @param password
     * @param email
     * @param qq
     * @param phone
     * @param type
     * @param province
     * @param city
     * @param area
     * @returns {type[]}
     */
    reg: function(username, password, email, qq, phone, type, province, city, area) {
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

    /**
     * 用户登陆
     * @param username
     * @param password
     * @returns {*}
     */
    login: function(username, password) {
      var self = this;
      var args = {
        username: username
        , password: md5(password)
      };

      return self
        .where(args)
        .find()
    },

    /**
     * 更新用户登陆信息
     * @param id
     * @param ip
     * @returns {*}
     */
    updateLoginData: function(id, ip) {
      var self = this;

      return self
        .where({id: id})
        .update({loginTime: moment().unix(), lastIP: ip})
    },

    /**
     * 修改用户QQ
     * @param id
     * @param qq * @returns {*}
     */
    editQQ: function(id, qq) {
      var self = this;

      var deferred = getDefer();

      if (!Yi.is.QQ(qq)) {
        deferred.reject(new Error('QQ号格式不正确'));
      } else {
        self
          .where({qq: qq})
          .find()
          .then(function(res) {
            if (!isEmpty(res)) {
              deferred.reject(new Error('该QQ号已存在'));
            } else {
              var p = self
                .where({id: id})
                .update({qq: qq});

              deferred.resolve(p);
            }
          });
      }


      return deferred.promise;
    },

    /**
     * 修改用户手机号
     * @param id
     * @param phone
     * @returns {*}
     */
    editPhone: function(id, phone) {
      var self = this;

      var deferred = getDefer();

      if (!Yi.is.phone(phone)) {
        deferred.reject(new Error('手机号格式不正确'));
      } else {
        self
          .where({phone: phone})
          .find()
          .then(function(res) {
            if (!isEmpty(res)) {
              deferred.reject(new Error('该手机号已存在'));
            } else {
              var p = self
                .where({id: id})
                .update({phone: phone});

              deferred.resolve(p);
            }
          });
      }

      return deferred.promise;
    },

    /**
     * 编辑登陆密码
     * @param id
     * @param oldPassword
     * @param password
     * @returns {*}
     */
    editPassword: function(id, oldPassword, password) {
      var self = this;

      return self
        .getUser(id)
        .then(function(cUser) {
          if (cUser.password != md5(oldPassword)) {
            throw new Error('密码不正确');
          } else {
            return self
              .where({id: cUser.id})
              .update({password: md5(password)})
          }
        })
    },

    /**
     * 编辑支付密码
     * @param id
     * @param oldPassword
     * @param password
     * @returns {*}
     */
    editTradePassword: function(id, oldPassword, password) {
      var self = this;

      return self
        .getUser(id)
        .then(function(cUser) {
          if (cUser.tradePassword != md5(oldPassword)) {
            throw new Error('密码不正确');
          } else {
            return cUser;
          }
        })
        .then(function(cUser) {
          return self
            .where({id: cUser.id})
            .update({tradePassword: md5(password)})
        })
    },

    /**
     * 添加支付密码
     * @param id
     * @param password
     * @returns {*}
     */
    addTradePassword: function(id, password) {
      var self = this;

      return self
        .getUser(id)
        .then(function(cUser) {
          return self
            .where({id: cUser.id})
            .update({tradePassword: md5(password)})
        })
    },

    /**
     * 增加押金
     * @param id
     * @param value
     * @returns {type[]|*}
     */
    addMoney: function(id, value) {
      var self = this;

      return self
        .where({id: id})
        .updateField('money', ['exp', 'money+' + value])
    },

    /**
     * 减少押金
     * @param id
     * @param value
     * @returns {type[]|*}
     */
    subMoney: function(id, value) {
      var self = this;

      return self
        .where({id: id})
        .updateField('money', ['exp', 'money-' + parseFloat(value)])
    },

    /**
     * 增加金币
     * @param id
     * @param value
     * @returns {type[]|*}
     */
    addCoin: function(id, value) {
      var self = this;

      return self
        .where({id: id})
        .updateField('coin', ['exp', 'coin+' + parseFloat(value)])
    },

    /**
     * 减少金币
     * @param id
     * @param value
     * @returns {type[]|*}
     */
    subCoin: function(id, value) {
      var self = this;

      return self
        .where({id: id})
        .updateField('coin', ['exp', 'coin-' + parseFloat(value)])
    },

    /**
     * 增加流量
     * @param id
     * @param payPV
     * @returns {type[]|*}
     */
    addPV: function(id, payPV) {
      var self = this;
      //var pv = pvMap[payPV];

      return self
        .where({id: id})
        .updateInc('pv', payPV)
    },

    /**
     * 减少流量
     * @param id
     * @param pv
     * @returns {type[]|*}
     */
    subPV: function(id, pv) {
      var self = this;

      return self
        .where({id: id})
        .updateDec('pv', pv)
    }
  }
});
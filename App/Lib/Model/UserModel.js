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

    login: function(username, password) {
      var self = this;
      console.log(self);
    }
  }
});
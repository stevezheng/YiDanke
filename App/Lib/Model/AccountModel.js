module.exports = Model(function() {
  return {
    fields: {
      'accountUserId': {
        valid: ['required']
        , msg: {
          required: '请先登录'
        }
      },
      'accountPlatform': {
        valid: ['required']
        , msg: {
          required: '平台不能为空'
        }
      },
      'accountName': {
        valid: ['required']
        , msg: {
          required: '账号不能为空'
        }
      },
      'accountPhone': {
        valid: ['required', 'mobile']
        , msg: {
          required: '手机号不能为空'
          , mobile: '手机号格式不正确'
        }
      },
      'accountRealName': {
        valid: ['required']
        , msg: {
          required: '收货人不能为空'
        }
      },
      'accountProvince': {
        valid: ['required']
        , msg: {
          required: '省份不能为空'
        }
      },
      'accountCity': {
        valid: ['required']
        , msg: {
          required: '城市不能为空'
        }
      },
      'accountArea': {
        valid: ['required']
        , msg: {
          required: '地区不能为空'
        }
      }
    },

    all: function(accountUserId) {
      var self = this;
      return self
        .where({accountUserId: accountUserId})
        .select()
    },

    getOne: function(accountUserId, id) {
      var self = this;

      return self
        .where({accountUserId: accountUserId, id: id})
        .find()
    },

    getOwn: function(accountUserId) {
      var self = this;

      return self
        .where({accountUserId: accountUserId})
        .select()
    },

    getOwnPass: function(accountUserId) {
      var self = this;

      return self
        .where({accountUserId: accountUserId, accountStatus: 1})
        .select()
    },

    addOne: function(accountUserId, accountName, accountRealName, accountProvince, accountCity, accountArea, accountAddress, accountPhone, accountPlatform) {
      var self = this;

      return self
        .add({
          'accountUserId': accountUserId
          , 'accountName': accountName
          , 'accountRealName': accountRealName
          , 'accountProvince': accountProvince
          , 'accountCity': accountCity
          , 'accountArea': accountArea
          , 'accountAddress': accountAddress
          , 'accountPhone': accountPhone
          , 'accountPlatform': accountPlatform
        });
    },

    editOne: function(accountUserId, id, accountName, accountRealName, accountProvince, accountCity, accountArea, accountAddress, accountPhone, accountPlatform) {
      var self = this;

      return self
        .where({
          'accountUserId': accountUserId
          , id: id
        })
        .update({
          'accountName': accountName
          , 'accountRealName': accountRealName
          , 'accountProvince': accountProvince
          , 'accountCity': accountCity
          , 'accountArea': accountArea
          , 'accountAddress': accountAddress
          , 'accountPhone': accountPhone
          , 'accountPlatform': accountPlatform
          , 'accountStatus': 0
        });
    }
  }
});
module.exports = Model(function() {
  return {
    fields: {
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

    addOne: function(accountUserId, accountName, accountRealName, accountProvince, accountCity, accountArea, accountAddress, accountPhone, accountPlatform) {
      var self = this;

      var deferred = getDefer();

      if (!Yi.is.phone(accountPhone)) {
        deferred.reject(new Error('手机号格式不正确'));
      }

      var p = self
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

      deferred.resolve(p);

      return deferred.promise;
    }
  }
});
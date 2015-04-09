module.exports = Model(function() {
  return {
    fields: {
      'shopUserId': {
        valid: ['required']
        , msg: {
          required: '请先登录'
        }
      },
      'shopPlatform': {
        valid: ['required']
        , msg: {
          required: '平台不能为空'
        }
      },
      'shopName': {
        valid: ['required']
        , msg: {
          required: '店铺名不能为空'
        }
      },
      'shopUrl': {
        valid: ['required']
        , msg: {
          required: '店铺名不能为空'
        }
      },
      'shopProvince': {
        valid: ['required']
        , msg: {
          required: '省份不能为空'
        }
      },
      'shopCity': {
        valid: ['required']
        , msg: {
          required: '城市不能为空'
        }
      },
      'shopArea': {
        valid: ['required']
        , msg: {
          required: '地区不能为空'
        }
      }
    },

    all: function(shopUserId) {
      var self = this;
      return self
        .where({shopUserId: shopUserId})
        .select()
    },

    getOne: function(shopUserId, id) {
      var self = this;

      return self
        .where({shopUserId: shopUserId, id: id})
        .find()
    },

    addOne: function(shopUserId, shopName, shopUrl, shopProvince, shopCity, shopArea, shopPlatform) {
      var self = this;

      return self
        .add({
          'shopUserId': shopUserId
          , 'shopName': shopName
          , 'shopUrl': shopUrl
          , 'shopProvince': shopProvince
          , 'shopCity': shopCity
          , 'shopArea': shopArea
          , 'shopPlatform': shopPlatform
        });
    },

    editOne: function(shopUserId, id, shopName, shopUrl, shopProvince, shopCity, shopArea, shopPlatform) {
      var self = this;

      return self
        .where({
          'shopUserId': shopUserId
          , id: id
        })
        .update({
          'shopName': shopName
          , 'shopUrl': shopUrl
          , 'shopProvince': shopProvince
          , 'shopCity': shopCity
          , 'shopArea': shopArea
          , 'shopPlatform': shopPlatform
          , 'shopStatus': 0
        });
    }
  }
});
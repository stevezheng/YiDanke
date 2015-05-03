module.exports = Model(function() {
  return {
    fields: {
      'shopUserId': {
        valid: ['required']
        , msg: {
          required: '请先登录'
        }
      },
      'shopName': {
        valid: ['required']
        , msg: {
          required: '店铺名不能为空'
        }
      },
      'shopUrl': {
        valid: ['required', 'url']
        , msg: {
          required: '店铺名不能为空'
          , url: '店铺名网址格式不正确'
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
    },

    all: function(shopUserId) {
      var self = this;
      return self
        .order('id desc')
        .where({shopUserId: shopUserId})
        .select()
    },

    /**
     * 获取当前用户的店铺
     * @param shopUserId
     * @returns {*}
     */
    getOwn: function(shopUserId) {
      var self = this;

      return self
        .order('id desc')
        .where({shopUserId: shopUserId})
        .select()
    },

    /**
     * 获取当前用户通过审核的店铺
     * @param shopUserId
     * @returns {*}
     */
    getOwnPass: function(shopUserId) {
      var self = this;

      return self
        .order('id desc')
        .where({shopUserId: shopUserId, shopStatus: 1})
        .select()
    },

    getOne: function(shopUserId, id) {
      var self = this;

      return self
        .where({shopUserId: shopUserId, id: id})
        .find()
    },

    addOne: function(shopUserId, shopName, shopUrl, shopProvince, shopCity, shopArea, shopAddress, shopExpressNumber, shopExpressPhone, shopPlatform) {
      var self = this;

      //todo:这里应该要根据shopPlatform判断shopUrl是否正确

      return self
        .thenAdd({
          'shopUserId': shopUserId
          , 'shopName': shopName
          , 'shopUrl': shopUrl
          , 'shopProvince': shopProvince
          , 'shopCity': shopCity
          , 'shopArea': shopArea
          , 'shopAddress': shopAddress
          , 'shopExpressNumber': shopExpressNumber
          , 'shopExpressPhone': shopExpressPhone
          , 'shopPlatform': shopPlatform
        }, {
          'shopUrl': shopUrl
        }, true);
    },

    editOne: function(shopUserId, id, shopName, shopUrl, shopProvince, shopCity, shopArea, shopAddress, shopExpressPhone, shopExpressNumber) {
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
          , 'shopAddress': shopAddress
          , 'shopExpressPhone': shopExpressPhone
          , 'shopExpressNumber': shopExpressNumber
          , 'shopStatus': 0
        });
    },

    adminEditShop: function(id, shopName, shopUrl, shopProvince, shopCity, shopArea, shopAddress, shopExpressNumber) {
      var self = this;

      return self
        .where({
          id: id
        })
        .update({
          'shopName': shopName
          , 'shopUrl': shopUrl
          , 'shopProvince': shopProvince
          , 'shopCity': shopCity
          , 'shopArea': shopArea
          , 'shopAddress': shopAddress
          , 'shopExpressNumber': shopExpressNumber
        });
    }
  }
});
module.exports = Model(function() {
  return {
    fields: {
      'moneyUserId': {
        valid: ['required']
        , msg: {
          required: '请先登录'
        }
      },
      'moneyPlatform': {
        valid: ['required']
        , msg: {
          required: '平台不能为空'
        }
      }
    },

    /**
     * 添加单条充值申请
     * @param moneyType
     * @param moneyPlatform
     * @param moneyUserId
     * @param moneyValue
     * @param moneyOrder
     * @returns {*}
     */
    addOne: function(moneyType, moneyPlatform, moneyUserId, moneyValue, moneyOrder) {
      var self = this;

      return self
        .add({
          moneyType: moneyType
          , moneyPlatform: moneyPlatform
          , moneyUserId: moneyUserId
          , moneyValue: moneyValue
          , moneyOrder: moneyOrder
        })
    },

    /**
     * 通过申请
     * @param id
     * @param moneyUserId
     * @param moneyOrder
     * @returns {*}
     */
    pass: function(id, moneyUserId, moneyOrder) {
      var self = this;

      return self
        .where({id: id, moneyUserId: moneyUserId, moneyOrder: moneyOrder})
        .update({moneyStatus: 1})
    },

    /**
     * 拒绝申请
     * @param id
     * @param moneyUserId
     * @returns {*}
     */
    unpass: function(id, moneyUserId) {
      return self
        .where({id: id, moneyUserId: moneyUserId, moneyOrder: moneyOrder})
        .update({moneyStatus: -1})
    }
  }
});
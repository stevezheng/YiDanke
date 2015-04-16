module.exports = Model(function() {
  return {
    addOne: function(doTaskTerminal, doTaskUserId, doTaskTaskId, doTaskAccountId, doTaskAccountName, doTaskKeyword, doTaskFee, doTaskExtendFee, doTaskShopId, doTaskShopName) {
      var self = this;

      return self
        .add({
          doTaskStatus: 0
          , doTaskTerminal: doTaskTerminal
          , doTaskUserId: doTaskUserId
          , doTaskTaskId: doTaskTaskId
          , doTaskAccountId: doTaskAccountId
          , doTaskAccountName: doTaskAccountName
          , doTaskKeyword: doTaskKeyword
          , doTaskFee: doTaskFee
          , doTaskExtendFee: doTaskExtendFee
          , doTaskShopId: doTaskShopId
          , doTaskShopName: doTaskShopName
        })
    },

    hasDoneShop: function(userId, accountId, shopName) {
      var self = this;

      return self
        .where({doTaskUserId: userId, doTaskAccountId: accountId, doTaskShopName: shopName})
        .find()
    },

    hasDoing: function(userId) {
      var self = this;

      return self
        .where({doTaskUserId: userId, doTaskStatus: 0})
        .find()
    }
  }
});
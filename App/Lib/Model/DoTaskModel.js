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

    getOwnOneAllBySeller: function(userId) {
      var self = this;

      return self
        .order('yi_do_task.id desc')
        .join({
          table: 'task'
          , join: 'left'
          , on: {
            'doTaskTaskId': 'id'
          }
        })
        .join({
          table: 'task_taobao'
          , join: 'left'
          , on: {
            'doTaskTaskId': 'taobaoTaskId'
          }
        })
        .join({
          table: 'task_tmall'
          , join: 'left'
          , on: {
            'doTaskTaskId': 'tmallTaskId'
          }
        })
        .join({
          table: 'task_jd'
          , join: 'left'
          , on: {
            'doTaskTaskId': 'jdTaskId'
          }
        })
        .join({
          table: 'task_extend'
          , join: 'left'
          , on: {
            'doTaskTaskId': 'extendTaskId'
          }
        })
        .where({'yi_task.taskUserId': userId})
        .select()
    },

    getOwnOneAllInfo: function(userId, id) {
      var self = this;

      return self
        .join({
          table: 'task'
          , join: 'left'
          , on: {
            'doTaskTaskId': 'id'
          }
        })
        .join({
          table: 'task_taobao'
          , join: 'left'
          , on: {
            'doTaskTaskId': 'taobaoTaskId'
          }
        })
        .join({
          table: 'task_tmall'
          , join: 'left'
          , on: {
            'doTaskTaskId': 'tmallTaskId'
          }
        })
        .join({
          table: 'task_jd'
          , join: 'left'
          , on: {
            'doTaskTaskId': 'jdTaskId'
          }
        })
        .join({
          table: 'task_extend'
          , join: 'left'
          , on: {
            'doTaskTaskId': 'extendTaskId'
          }
        })
        .where({'yi_do_task.id': id, doTaskUserId: userId})
        .find()
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
    },

    zixuan: function(userId) {
      var self = this;

      return self
        .order('yi_do_task.id desc')
        .join({
          table: 'task'
          , join: 'left'
          , on: {
            'doTaskTaskId': 'id'
          }
        })
        .join({
          table: 'do_task_detail'
          , join: 'left'
          , on: {
            'id': 'doTaskDetailDoTaskId'
          }
        })
        .where({'yi_task.taskUserId': userId, 'yi_task.taskTransport': 'zixuan', 'yi_do_task.doTaskStatus': 1})
        .select()
    }
  }
});
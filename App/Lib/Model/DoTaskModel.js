var moment = require('moment');
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

    getOwnOneAllByBuyer: function(userId) {
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
          table: 'do_task_detail'
          , join: 'left'
          , on: {
            'id': 'doTaskDetailDoTaskId'
          }
        })
        .join({
          table: 'task_extend'
          , join: 'left'
          , on: {
            'doTaskTaskId': 'extendTaskId'
          }
        })
        .where({'yi_do_task.doTaskUserId': userId})
        .select()
    },

    getShouhuoByBuyer: function(userId) {
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
          table: 'do_task_detail'
          , join: 'left'
          , on: {
            'id': 'doTaskDetailDoTaskId'
          }
        })
        .where({'yi_do_task.doTaskUserId': userId, 'yi_do_task.doTaskStatus': 3})
        .select()
    },

    getWithdrawByBuyer: function(userId) {
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
          table: 'do_task_detail'
          , join: 'left'
          , on: {
            'id': 'doTaskDetailDoTaskId'
          }
        })
        .where({'yi_do_task.doTaskUserId': userId, 'yi_do_task.doTaskStatus': 6})
        .select()
    },

    getOne: function(userId, id) {
      var self = this;
      var where = {'yi_do_task.id': id};

      if (userId) {
        where.doTaskUserId = userId;
      }

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
        .join({
          table: 'do_task_detail'
          , join: 'left'
          , on: {
            'id': 'doTaskDetailDoTaskId'
          }
        })
        .join({
          table: 'do_task_extend'
          , join: 'left'
          , on: {
            'id': 'doTaskExtendDoTaskId'
          }
        })
        .where(where)
        .find()
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

    hasDoneShop: function(userId, accountId, shopId) {
      var self = this;

      return self
        //通过淘宝号判断是否做过
        //.where({doTaskUserId: userId, doTaskAccountId: accountId, doTaskShopName: shopName})
        //通过平台号判断是否做过
        .where({doTaskUserId: userId, doTaskShopId: shopId})
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
          table: 'do_task_detail'
          , join: 'left'
          , on: {
            'id': 'doTaskDetailDoTaskId'
          }
        })
        .join({
          table: 'do_task_extend'
          , join: 'left'
          , on: {
            'id': 'doTaskExtendDoTaskId'
          }
        })
        .where({'yi_task.taskUserId': userId, 'yi_task.taskTransportType': 'zixuan', 'yi_do_task.doTaskStatus': 1})
        .select()
    },

    baoyou: function(userId) {
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
          table: 'do_task_detail'
          , join: 'left'
          , on: {
            'id': 'doTaskDetailDoTaskId'
          }
        })
        .join({
          table: 'do_task_extend'
          , join: 'left'
          , on: {
            'id': 'doTaskExtendDoTaskId'
          }
        })
        .where({'yi_task.taskUserId': userId, 'yi_do_task.doTaskStatus': 2})
        .select()
    },

    tuikuan: function(userId) {
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
          table: 'do_task_detail'
          , join: 'left'
          , on: {
            'id': 'doTaskDetailDoTaskId'
          }
        })
        .join({
          table: 'do_task_extend'
          , join: 'left'
          , on: {
            'id': 'doTaskExtendDoTaskId'
          }
        })
        .where({'yi_task.taskUserId': userId, 'yi_do_task.doTaskStatus': 4})
        .select()
    },

    getTuikuanByBuyer: function(userId) {
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
          table: 'do_task_detail'
          , join: 'left'
          , on: {
            'id': 'doTaskDetailDoTaskId'
          }
        })
        .join({
          table: 'do_task_extend'
          , join: 'left'
          , on: {
            'id': 'doTaskExtendDoTaskId'
          }
        })
        .where({'yi_do_task.doTaskUserId': userId, 'yi_do_task.doTaskStatus': 5})
        .select()
    },

    doTuikuan: function(id, userId) {
      var self = this;
      var where = {
        id: id
      };

      if (userId) {
        where.doTaskUserId = userId;

      }

      return D('do_task_extend')
        .where({doTaskExtendDoTaskId: id})
        .update({doTaskExtendPaybackTime: moment().format('YYYY-MM-DD HH:mm:ss')})
        .then(function() {
          return D('do_task')
            .where(where)
            .update({doTaskStatus: 5})
        })
    },

    queryPage: function(page, num, args) {
      var self = this;

      return self
        .field(['yi_do_task.*'
        ,'yi_user.username'
        ,'yi_task.taskTransportType'
        ,'yi_task.taskUserName'
        ,'yi_task.taskShopName'
        ,'yi_task.taskName'
        ,'yi_task.taskUrl'
          ,'yi_do_task_detail.doTaskDetailDoTaskId'
          ,'yi_do_task_detail.doTaskDetailTaskId'
        ,'yi_do_task_detail.doTaskDetailTalkImage'
        ,'yi_do_task_detail.doTaskDetailOrderImage'
        ,'yi_do_task_detail.doTaskDetailOrderId'
        ,'yi_do_task_detail.doTaskDetailCreateTime'
        ,'yi_do_task_extend.doTaskExtendExpressName'
        ,'yi_do_task_extend.doTaskExtendExpressId'
        ,'yi_task.taskTotalMoney'
        ,'yi_task.taskPlatform'])
        .page(page, Number(num))
        .order('yi_do_task.id desc')
        .join({
          table: 'task'
          , join: 'left'
          , on: {
            'doTaskTaskId': 'yi_task.id'
          }
        })
        //.join({
        //  table: 'task_taobao'
        //  , join: 'left'
        //  , on: {
        //    'doTaskTaskId': 'taobaoTaskId'
        //  }
        //})
        //.join({
        //  table: 'task_tmall'
        //  , join: 'left'
        //  , on: {
        //    'doTaskTaskId': 'tmallTaskId'
        //  }
        //})
        //.join({
        //  table: 'task_jd'
        //  , join: 'left'
        //  , on: {
        //    'doTaskTaskId': 'jdTaskId'
        //  }
        //})
        .join({
          table: 'task_extend'
          , join: 'left'
          , on: {
            'doTaskTaskId': 'extendTaskId'
          }
        })
        .join({
          table: 'do_task_detail'
          , join: 'left'
          , on: {
            'id': 'doTaskDetailDoTaskId'
          }
        })
        .join({
          table: 'do_task_extend'
          , join: 'left'
          , on: {
            'id': 'doTaskExtendDoTaskId'
          }
        })
        .join({
          table: 'user'
          , join: 'left'
          , on: {
            'doTaskUserId': 'yi_user.id'
          }
        })
        .where(args)
        .countSelect()
    }
  }
});
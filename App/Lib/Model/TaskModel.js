module.exports = Model(function() {
  return {
    /**
     * 电脑待返还笔数
     * @param taskUserId
     */
    countPcDoing: function(taskUserId) {
      var self = this;

      return self
        .where({taskUserId: taskUserId, taskStatus: 3})
        .sum('taskPcDoingCount')
    },

    /**
     * 电脑待返还笔数
     * @param taskUserId
     */
    countPhoneDoing: function(taskUserId) {
      var self = this;

      return self
        .where({taskUserId: taskUserId, taskStatus: 3})
        .sum('taskPhoneDoingCount')
    },

    /**
     * 获取属于用户的某个任务
     * @param taskUserId
     * @param taskId
     */
    getOwnOne: function(taskUserId, taskId) {
      var self = this;

      return self
        .join({
          table: 'task_taobao'
          , join: 'left'
          , on: {'id': 'taobaoTaskId'}
        })
        .join({
          table: 'task_tmall'
          , join: 'left'
          , on: {'id': 'tmallTaskId'}
        })
        .join({
          table: 'task_jd'
          , join: 'left'
          , on: {'id': 'jdTaskId'}
        })
        .join({
          table: 'task_extend'
          , join: 'left'
          , on: {'id': 'extendTaskId'}
        })
        .where({'yi_task.id': taskId})
        //todo:给后台单独的权限
        //.where({taskUserId: taskUserId, 'yi_task.id': taskId})
        .find()
    },

    /**
     * 通过的订单
     * @param taskUserId
     * @returns {*}
     */
    pass: function(taskUserId) {
      var self = this;
      var data = {
        taskStatus: 3
      };

      if (taskUserId) {
        data.taskUserId = taskUserId;
      }

      return self
        .where(data)
        .select()
    },

    /**
     * 获取某用户的所有任务
     * @param taskUserId
     * @returns {*}
     */
    all: function(taskUserId) {
      var self = this;
      return self
        .order('yi_task.id desc')
        .join({
          table: 'task_taobao'
          , join: 'left'
          , on: {'id': 'taobaoTaskId'}
        })
        .join({
          table: 'task_tmall'
          , join: 'left'
          , on: {'id': 'tmallTaskId'}
        })
        .join({
          table: 'task_jd'
          , join: 'left'
          , on: {'id': 'jdTaskId'}
        })
        .where({taskUserId: taskUserId})
        .select()
    },

    /**
     * 获取所有通过的任务
     * @returns {*}
     */
    allPass: function() {
      var self = this;
      return self
        .order('id desc')
        .where({taskStatus: 3})
        .select()
    },

    /**
     * 获取一个创建成功的任务
     * @param id
     * @returns {*}
     */
    getOne: function(id) {
      var self = this;

      return self
        .where({id: id, taskStatus: 3})
        .find()
    },

    /**
     * 创建任务
     * @param task
     * @returns {*}
     */
    addOne: function(task) {
      var self = this;

      task.taskStatus = 1;

      return self
        .add(task)
    },

    /**
     * 任务付款
     * @param userId
     * @param id
     * @returns {*}
     */
    pay: function(userId, id) {
      var self = this;

      return self
        .where({taskUserId: userId, id: id})
        .update({taskStatus: 2})
    },

    addPcDoingCount: function(taskId) {
      var self = this;

      return self
        .where({id: taskId})
        .updateInc('taskPcDoingCount')
    },

    addPhoneDoingCount: function(taskId) {
      var self = this;

      return self
        .where({id: taskId})
        .updateInc('taskPhoneDoingCount')
    },

    taobaoKeywords: function(taskId) {
      var self = this;

      return self
        .join({
          table: 'task_taobao'
          , join: 'left'
          , on: {'id': 'taobaoTaskId'}
        })
        .join({
          table: 'task_tmall'
          , join: 'left'
          , on: {'id': 'tmallTaskId'}
        })
        .join({
          table: 'task_jd'
          , join: 'left'
          , on: {'id': 'jdTaskId'}
        })
        .where({'yi_task.id': taskId})
        .find()
    },

    upTaskFee: function(taskId, upTaskFee) {
      var self = this;

      return self
        .where({id: taskId})
        .update({taskExtendFee: ['exp', 'taskExtendFee+' + upTaskFee]})
    },

    cancelTask: function(taskUserId, taskId) {
      var self = this;

      return self
        .where({id: taskId, taskUserId: taskUserId})
        .update({taskStatus: -1})
    }
  }
});
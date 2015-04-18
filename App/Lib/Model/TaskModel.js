module.exports = Model(function() {
  return {
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

    allPass: function() {
      var self = this;
      return self
        .order('id desc')
        .where({taskStatus: 3})
        .select()
    },

    getOne: function(id) {
      var self = this;

      return self
        .where({id: id, taskStatus: 3})
        .find()
    },

    addOne: function(task) {
      var self = this;

      task.taskStatus = 1;

      return self
        .add(task)
    },

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
    }
  }
});
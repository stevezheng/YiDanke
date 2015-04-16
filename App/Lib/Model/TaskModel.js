module.exports = Model(function() {
  return {
    all: function(taskUserId) {
      var self = this;
      return self
        .where({taskUserId: taskUserId})
        .select()
    },

    allPass: function() {
      var self = this;
      return self
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
    }
  }
});
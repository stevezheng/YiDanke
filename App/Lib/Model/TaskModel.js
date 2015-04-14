module.exports = Model(function() {
  return {
    all: function(taskUserId) {
      var self = this;
      return self
        .where({taskUserId: taskUserId})
        .select()
    },

    addOne: function(task) {
      var self = this;

      return self
        .add(task)
    },
  }
});
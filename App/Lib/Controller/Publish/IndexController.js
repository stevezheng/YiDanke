var TaskModel = thinkRequire('TaskModel');
var task = TaskModel();

module.exports = Controller('Publish/BaseController', function() {
  return {
    getTaskAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {}

      if (self.isPost()) {
        var taskId = self.post('taskId');

        return task
          .getOwnOne(self.cUser.id, taskId)
          .then(function(res) {
            return self.success(res);
          })
          .catch(function(err) {
            return self.error(500, err);
          })
      }
    },
  }
});
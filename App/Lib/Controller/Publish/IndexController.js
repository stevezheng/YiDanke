var TaskModel = thinkRequire('TaskModel');
var task = TaskModel();

module.exports = Controller('Publish/BaseController', function() {
  return {
    getTaskAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {}

      if (self.isPost()) {
        var taskId = self.post('taskId') || self.post('id');

        var id;

        if (self.cUser) {
          id = self.cUser.id;
        }
        //todo:临时方案

        return task
          .getOwnOne(id, taskId)
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
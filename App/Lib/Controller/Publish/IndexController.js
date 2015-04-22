var TaskModel = thinkRequire('TaskModel');
var UserModel = thinkRequire('UserModel');
var task = TaskModel();
var user = UserModel();

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

    addExtendFeeAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var taskId = self.post('taskId')
          , upTaskFee = self.post('upTaskFee');

        var totalTaskFee, cTask, cUser;


        return task
          .getOwnOne(self.cUser.id, taskId)
          .then(function(res) {
            cTask = res;
            return user
              .getUser(self.cUser.id)
          })
          .then(function(res) {
            cUser = res;
            var totalUndoCount = cTask.taskTotalCount - cTask.taskPhoneDoingCount - cTask.taskPhoneDoneCount - cTask.taskPcDoingCount - cTask.taskPcDoneCount;
            totalTaskFee = totalUndoCount * upTaskFee;
            if (cUser.coin < totalTaskFee) {
              return self.error(500, '金币不足');
            } else {
              return task
                .upTaskFee(taskId, upTaskFee)
            }
          })
          .then(function(res) {
            return user
              .subCoin(self.cUser.id, totalTaskFee)
          })
          .then(function() {
            return self.success('加赏成功');
          })
      }
    },
  }
});
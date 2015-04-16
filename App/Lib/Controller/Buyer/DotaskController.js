var TaskModel = thinkRequire('TaskModel');
var DoTaskModel = thinkRequire('DoTaskModel');

module.exports = Controller("Buyer/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '做任务中心');

      if (self.isGet()) {
        var id = self.get('id');

        self.display();
      }

      if (self.isPost()) {
        var taskId = self.post('taskId')
          , accountId = self.post('accountId')
          , accountName = self.post('accountName')
          , terminal = self.post('terminal');

        var task = TaskModel();

        //判断任务是否可接
        task
          .getOne(taskId)
          .then(function(res) {
            if (terminal == 'pc') {
              if (res.taskPcCount - res.taskPcDoingCount - res.taskPcDoneCount < 1) {
                self.error(500, '电脑端任务单不足');
              }
            }

            if (terminal == 'phone') {
              if (res.taskPhoneCount - res.taskPhoneDoingCount - res.taskPhoneDoneCount < 1) {
                self.error(500, '手机/Pad端任务单不足');
              }
            }

            // todo: 判断是否在xx天内接过该任务

            var keyword = '';
            var doTask = DoTaskModel();

            return doTask
              .addOne(terminal, self.cUser.id, taskId, accountId, accountName, keyword, res.taskFee, res.taskExtendFee)
          })
          .then(function(insertId) {
            return self.success(insertId);
          })
          .catch(function(err) {
            return self.error(500, err);
          })
      }
    },
  };
});
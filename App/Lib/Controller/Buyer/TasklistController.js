var TaskModel = thinkRequire('TaskModel');
module.exports = Controller("Buyer/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '任务列表');

      if (self.isGet()) {
        self.display();
      }

      if (self.isPost()) {}
    },

    allAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {
        var task = TaskModel();

        task
          .allPass()
          .then(function(res) {
            return self.success(res);
          })
      }

      if (self.isPost()) {}
    },

    checkAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {}

      if (self.isPost()) {
        var taskId = self.post('taskId')
          , accountId = self.post('accountId')
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

            return self.success('该任务可接');
          })
      }
    },
  };
});
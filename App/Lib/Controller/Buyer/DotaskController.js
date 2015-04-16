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
        var doTask = DoTaskModel();
        var _task, keyword;

        //判断任务是否可接
        task
          .getOne(taskId)
          .then(function(res) {
            _task = res;
            //检查金币是否足够
            if (self.cUser.coin < 1) {
              self.error(500, '金币不足,请先充值');
            }

            //检查任务单是否足够
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

            return doTask
              .hasDoing(self.cUser.id)
          })
          .then(function(res) {
            if (!isEmpty(res)) {
              return self.error(500, '该已经有正在做的任务了');
            }

            return doTask
              .hasDoneShop(self.cUser.id, accountId, _task.taskShopName)
          })
          .then(function(res) {
            if (!isEmpty(res)) {
              return self.error(500, '该账号已经做过该店任务了');
            }

            //调整任务执行数量进度
            if (terminal == 'pc') {
              return task
                .addPcDoingCount(taskId)
            }

            if (terminal == 'phone') {
              return task
                .addPhoneDoingCount(taskId)
            }
          })
          .then(function() {
            //获取关键词
            var keywords = [];

          })
          .then(function() {
            //冻结押金
          })
          .then(function() {
            return doTask
              .addOne(terminal, self.cUser.id, taskId, accountId, accountName, keyword, _task.taskFee, _task.taskExtendFee, _task.taskShopId, _task.taskShopName)
          })
          .then(function(insertId) {
            return self.success(insertId);
          })
          .catch(function(err) {
            return self.error(500, err);
          })
      }
    },

    checkAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var taskId = self.post('taskId')
          , accountId = self.post('accountId')
          , accountName = self.post('accountName')
          , terminal = self.post('terminal');

        var task = TaskModel();
        var doTask = DoTaskModel();
        var _task, keyword;

        //判断任务是否可接
        task
          .getOne(taskId)
          .then(function(res) {
            _task = res;
            //检查金币是否足够
            if (self.cUser.coin < 1) {
              self.error(500, '金币不足,请先充值');
            }

            //检查任务单是否足够
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

            return doTask
              .hasDoing(self.cUser.id)
          })
          .then(function(res) {
            if (!isEmpty(res)) {
              return self.error(500, '该账号已经有正在做的任务了');
            }

            return doTask
              .hasDoneShop(self.cUser.id, accountId, _task.taskShopName)
          })
          .then(function(res) {
            if (!isEmpty(res)) {
              return self.error(500, '该账号已经做过该店任务了');
            }

            return self.success('该任务可接');
          })
          .catch(function(err) {
            return self.error(500, err);
          })
      }
    },
  };
});
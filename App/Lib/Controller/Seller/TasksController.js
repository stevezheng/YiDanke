var DoTask = thinkRequire('DoTaskModel');
var TaskModel = thinkRequire('TaskModel');
var UserModel = thinkRequire('UserModel');
var moment = require('moment');

module.exports = Controller("Seller/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '任务中心');

      if (self.isGet()) {
        self.display();
      }

      if (self.isPost()) {}
    },

    ownAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {
        var task = TaskModel();

        task
          .all(self.cUser.id)
          .then(function(res) {
            return self.success(res);
          })
      }

      if (self.isPost()) {}
    },

    dotasksAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {
        var doTask = DoTask();

        doTask
          .getOwnOneAllBySeller(self.cUser.id)
          .then(function(res) {
            return self.success(res);
          });
      }

      if (self.isPost()) {}
    },

    zixuanAction: function() {
      var self = this;
      self.assign('title', '自选快递');

      if (self.isGet()) {

        self.display();
      }

      if (self.isPost()) {
        var doTask = DoTask();
        doTask
          .zixuan(self.cUser.id)
          .then(function(res) {
            return self.success(res);
          })
      }
    },

    baoyouAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

        self.display();
      }

      if (self.isPost()) {
        var doTask = DoTask();
        doTask
          .baoyou(self.cUser.id)
          .then(function(res) {
            return self.success(res);
          })
      }
    },

    tuikuanAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {
        return self.display();
      }

      if (self.isPost()) {
        var doTask = DoTask();
        doTask
          .tuikuan(self.cUser.id)
          .then(function(res) {
            return self.success(res);
          })
      }
    },

    doTuikuanAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var id = self.post('doTaskId');
        return D('do_task_extend')
          .where({doTaskExtendDoTaskId: id})
          .update({doTaskExtendPaybackTime: moment().format('YYYY-MM-DD HH:mm:ss')})
          .then(function() {
            return D('do_task')
              .where({id: id})
              .update({doTaskStatus: 5})
          })
          .then(function() {
            return self.success('退款成功');
          })
          .catch(function(err) {
            return self.error(500, err);
          })
      }
    },

    addExpressAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var data = {};

        data.doTaskExtendExpressName = self.post('doTaskExtendExpressName');
        data.doTaskExtendExpressId = self.post('doTaskExtendExpressId');
        data.doTaskExtendDoTaskId = self.post('doTaskDetailDoTaskId');
        data.doTaskExtendTaskId = self.post('doTaskDetailTaskId');
        data.doTaskExtendExpressTime = moment().unix();

        return D('do_task_extend')
          .thenAdd(data, {'doTaskExtendDoTaskId': data.doTaskExtendDoTaskId}, true)
          .then(function(res) {
            if (res.type == 'add') {
              return self.success('添加订单号成功');
            } else {
              return self.success('该任务已添加订单号');
            }
          })
          .catch(function(err) {
            console.log(err.stack);
            return self.error(err);
          })
      }
    },
    
    sendAction: function() {
      var self = this;
      self.assign('title', '');
    
      if (self.isGet()) {

      }
      
      if (self.isPost()) {
        var doTaskId = self.post('doTaskId');

        return D('do_task')
          .where({id: doTaskId})
          .update({doTaskStatus: 3})
          .then(function(res) {
            return self.success('发货成功');
          })
          .catch(function(err) {
            return self.error(500, '发货失败', err);
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
        var user = UserModel();
        var task = TaskModel();

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
  };
});
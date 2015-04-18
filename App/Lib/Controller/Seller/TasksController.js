var DoTask = thinkRequire('DoTaskModel');
var Task = thinkRequire('TaskModel');

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
        var task = Task();

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

    addExpressAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var data = {};

        data.doTaskExtendExpressName = self.post('doTaskDetailExpressName');
        data.doTaskExtendExpressId = self.post('doTaskDetailExpressId');
        data.doTaskExtendDoTaskId = self.post('doTaskDetailDoTaskId');
        data.doTaskExtendTaskId = self.post('doTaskDetailTaskId');
        console.log(data);

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
  };
});
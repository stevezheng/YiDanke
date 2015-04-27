var DoTask = thinkRequire('DoTaskModel');
var TaskModel = thinkRequire('TaskModel');
var UserModel = thinkRequire('UserModel');
var Log= thinkRequire('LogService');
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
            return Log.coin(
              -1
              , totalTaskFee
              , (self.cUser.coin - totalTaskFee)
              , self.cUser.id
              , self.cUser.username
              , 1
              , self.ip()
              , '加赏任务['+taskId+']扣除金币' + totalTaskFee  + '金币'
            );
          })
          .then(function() {
            return self.success('加赏成功');
          })
          .catch(function(err) {
            return self.error(err);
          })
      }
    },
    
    cancelTaskAction: function() {
      var self = this;
      self.assign('title', '');
    
      if (self.isGet()) {}
      
      if (self.isPost()) {
        var taskId = self.post('taskId');
        var task = TaskModel();
        var user = UserModel();
        var paybackMoney, paybackCoin;

        return task
          .getOwnOne(self.cUser.id, taskId)
          .then(function(res) {
            var totalUndoCount = res.taskTotalCount - res.taskPhoneDoingCount - res.taskPhoneDoneCount - res.taskPcDoingCount - res.taskPcDoneCount;
            paybackMoney = totalUndoCount * (res.taskPromise + res.taskTotalMoney);
            paybackCoin = totalUndoCount * (res.taskFee + res.taskExtendFee);

            return task
              .cancelTask(self.cUser.id, taskId)
          })
          .then(function() {
            return user
              .addMoney(self.cUser.id, paybackMoney)
          })
          .then(function() {
            return user
              .addCoin(self.cUser.id, paybackCoin)
          })
          .then(function() {
            var p1 = Log.coin(
              1
              , paybackCoin
              , (self.cUser.coin + paybackCoin)
              , self.cUser.id
              , self.cUser.username
              , 1
              , self.ip()
              , '撤销任务['+taskId+']返还' + paybackCoin + '金币'
            );

            var p2 = Log.money(
              1
              , paybackMoney
              , (self.cUser.money + paybackMoney)
              , self.cUser.id
              , self.cUser.username
              , 1
              , self.ip()
              , '撤销任务['+taskId+']返还' + paybackMoney + '元'
            );

            return Promise.all([p1, p2])
          })
          .then(function() {
            return self.success('撤销任务成功');
          })
          .catch(function(err) {
            return self.error(err);
          })
      }
    },

    taskDetailAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {
        var id = self.get('id');
        var task = TaskModel();

        return task
          .getOwnOne(self.cUser.id, id)
          .then(function(res) {
            self.assign('task', res);
            return self.display();
          })
      }

      if (self.isPost()) {

      }
    },
    
    doTaskListAction: function() {
      var self = this;
      self.assign('title', '');
    
      if (self.isGet()) {

      }
      
      if (self.isPost()) {
        var taskId = self.post('taskId');

        return D('do_task')
          .join({
            'table': 'do_task_detail'
            , 'join': 'left'
            , 'on': {
              'id': 'doTaskDetailDoTaskId'
            }
          })
          .join({
            'table': 'do_task_extend'
            , 'join': 'left'
            , 'on': {
              'id': 'doTaskExtendDoTaskId'
            }
          })
          .where({'yi_do_task.doTaskTaskId': taskId})
          .select()
          .then(function(res) {
            return self.success(res);
          })
          .catch(function(err) {
            console.error(err.stack);
            return self.error(err);
          })
      }
    },

    doTaskDetailAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {
        self.display();
      }

      if (self.isPost()) {
        var id = self.post('id');

        return D('do_task')
          .join({
            'table': 'do_task_detail'
            , 'join': 'left'
            , 'on': {
              'id': 'doTaskDetailDoTaskId'
            }
          })
          .join({
            'table': 'do_task_extend'
            , 'join': 'left'
            , 'on': {
              'id': 'doTaskExtendDoTaskId'
            }
          })
          .where({'yi_do_task.id': id})
          .find()
          .then(function(res) {
            return self.success(res);
          })
          .catch(function(err) {
            console.error(err.stack);
            return self.error(err);
          })
      }
    },
  };
});
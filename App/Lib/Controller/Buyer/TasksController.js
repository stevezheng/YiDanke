var moment = require('moment');
var DoTask = thinkRequire('DoTaskModel');
var UserModel = thinkRequire('UserModel');
var Log= thinkRequire('LogService');
module.exports = Controller("Buyer/BaseController", function(){
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

    doTasksAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {
        var doTask = DoTask();

        doTask
          .getOwnOneAllByBuyer(self.cUser.id)
          .then(function(res) {
            return self.success(res);
          });
      }

      if (self.isPost()) {}
    },
    
    todoTasksAction: function() {
      var self = this;
      self.assign('title', '');
    
      if (self.isGet()) {
        return D('do_task')
          .field(['yi_do_task.*', 'yi_task.taskName'])
          .order('id desc')
          .join({
            table: 'task'
            , join: 'left'
            , on: {
              'doTaskTaskId': 'id'
            }
          })
          .where({doTaskUserId: self.cUser.id, doTaskStatus: 0})
          .select()
          .then(function(res) {
            return self.success(res);
          })
          .catch(function(err) {
            return self.error(500, err);
          })
      }
      
      if (self.isPost()) {}
    },
    
    shouhuoAction: function() {
      var self = this;
      self.assign('title', '');
    
      if (self.isGet()) {
        self.display();
      }
      
      if (self.isPost()) {
        var doTask = DoTask();

        doTask
          .getShouhuoByBuyer(self.cUser.id)
          .then(function(res) {
            return self.success(res);
          });
      }
    },

    goodCommentAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var id = self.post('id')
          , doTaskExtendGoodComment = self.post('doTaskExtendGoodComment');

        return D('do_task_extend')
          .where({doTaskExtendDoTaskId: id})
          .update({doTaskExtendGoodComment: doTaskExtendGoodComment})
          .then(function() {
            return D('do_task')
              .where({id: id})
              .update({doTaskStatus: 4})
          })
          .then(function() {
            return self.success('评价成功');
          })
          .catch(function(err) {
            console.error(err);
            return self.error(500, err);
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
          .getTuikuanByBuyer(self.cUser.id)
          .then(function(res) {
            return self.success(res);
          });
      }
    },

    doTuikuanAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var doTaskId = self.post('doTaskId');
        var taskId = self.post('taskId');
        var terminal = self.post('terminal');
        var user = UserModel();
        var _dotask, _task;
        //修改确认退款状态
        return D('do_task_extend')
          .where({doTaskExtendDoTaskId: doTaskId})
          .update({doTaskExtendConfirmTime: moment().format('YYYY-MM-DD HH:mm:ss')})
          .then(function() {
            return D('do_task')
              .where({id: doTaskId})
              .find()
          })
          .then(function(res) {
            _dotask = res;
            if (res.doTaskStatus == 6) {
              return self.error(500, '请勿重复确认退款');
            } else {
              return D('do_task')
                .where({id: doTaskId})
                .update({doTaskStatus: 6})
            }
          })
          .then(function() {
            var data = {};
            if (terminal == 'pc') {
              data.taskPcDoingCount = ['exp', 'taskPcDoingCount-1'];
              data.taskPcDoneCount = ['exp', 'taskPcDoneCount+1'];
            }

            if (terminal == 'phone') {
              data.taskPhoneDoingCount = ['exp', 'taskPhoneDoingCount-1'];
              data.taskPhoneDoneCount = ['exp', 'taskPhoneDoneCount+1'];
            }
            //修改任务状态
            return D('task')
              .where({id: taskId})
              .update(data)
          })
          .then(function() {
            return user
              .addCoin(self.cUser.id, '1')
          })
          .then(function() {
            return user
              .addCoin(self.cUser.id, _dotask.doTaskFee + _dotask.doTaskExtendFee)
          })
          .then(function() {
            var p1 = Log.coin(
              1
              , 1
              , (self.cUser.coin + 1)
              , self.cUser.id
              , self.cUser.username
              , 0
              , self.ip()
              , '完成任务['+doTaskId+']返还押金1金币'
            );

            var p2 = Log.coin(
              1
              , _dotask.doTaskFee + _dotask.doTaskExtendFee
              , (self.cUser.coin + _dotask.doTaskFee + _dotask.doTaskExtendFee)
              , self.cUser.id
              , self.cUser.username
              , 0
              , self.ip()
              , '完成任务['+doTaskId+']获得佣金' + _dotask.doTaskFee + _dotask.doTaskExtendFee  + '金币'
            );

            return Promise.all([p1, p2])
          })
          .then(function() {
            return D('task')
              .where({id: taskId})
              .find()
              .then(function(res) {
                _task = res;
                var userId = res.taskUserId;

                return D('user')
                  .where({id: userId})
                  .find()
              })
              .then(function(res) {
                return Log.money(
                  1
                  , _task.taskTotalMoney * 0.05 + _task.taskPromise
                  , (res.money + _task.taskTotalMoney * 0.05 + _task.taskPromise)
                  , res.id
                  , res.username
                  , 1
                  , self.ip()
                  , '完成任务['+doTaskId+']返还押金' + _task.taskTotalMoney * 0.05 + _task.taskPromise  + '元'
                );
              })
          })
          .then(function() {
            return self.success('确认退款成功');
          })
          .catch(function(err) {
            console.error(err.stack);
            return self.error(500, err);
          })
      }
    },
  };
});
var moment = require('moment');
var DoTask = thinkRequire('DoTaskModel');
var UserModel = thinkRequire('UserModel');
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
        var _dotask;
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
              .addMoney(self.cUser.id, _dotask.doTaskFee + _dotask.doTaskExtendFee)
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
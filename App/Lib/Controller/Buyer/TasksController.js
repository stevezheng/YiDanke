var moment = require('moment');
var DoTask = thinkRequire('DoTaskModel');
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
        var id = self.post('id');
        return D('do_task_extend')
          .where({doTaskExtendDoTaskId: id})
          .update({doTaskExtendConfirmTime: moment().format('YYYY-MM-DD HH:mm:ss')})
          .then(function() {
            return D('do_task')
              .where({id: id})
              .update({doTaskStatus: 6})
          })
          .then(function() {
            return self.success('确认退款成功');
          })
          .catch(function(err) {
            return self.error(500, err);
          })
      }
    },
  };
});
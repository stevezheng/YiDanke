var moment = require('moment');
var _ = require('underscore');
var Log = thinkRequire('LogService');
var OutputService = thinkRequire('OutputService');
var DoTaskModel = thinkRequire('DoTaskModel');
module.exports = Controller("Admin/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '个人中心');

      if (self.isGet()) {
        return self.display();
      }

      if (self.isPost()) {
        var page = self.post('page')
          , data = self.post('data') || {};

        data = _.mapObject(data, function(val, key) {
          if (key == 'doTaskStatus') {
            return val
          } else {
            return ['like', '%' + val + '%'];
          }
        });

        if (data.taskPlatform) {
          data['yi_task.taskPlatform'] = data.taskPlatform;
          delete data.taskPlatform;
        }

        var doTask = DoTaskModel();

        return doTask
          .queryPage(page, 10, data)
          .then(function(res) {
            return self.success(res);
          })
          .catch(function(err) {
            console.error(err.stack);
          })
      }
    },

    doAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var doTask = DoTaskModel();
        var page = self.post('page');

        return doTask
          .queryPage(page, 20, {
            doTaskStatus: 1
          })
          .then(function(res) {
            return self.success(res);
          })
      }
    },
    
    searchAction: function() {
      var self = this;
      self.assign('title', '');
    
      if (self.isGet()) {}
      
      if (self.isPost()) {}
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
        data.doTaskExtendDoTaskId = self.post('doTaskExtendDoTaskId');
        data.doTaskExtendTaskId = self.post('doTaskExtendTaskId');
        data.doTaskExtendExpressTime = moment();

        return D('do_task_extend')
          .thenAdd(data, {'doTaskExtendDoTaskId': data.doTaskExtendDoTaskId}, true)
          .then(function(res) {
            if (res.type == 'add') {
              return D('do_task')
                .where({id: data.doTaskExtendDoTaskId})
                .update({doTaskStatus: 2})
                .then(function() {
                  return self.success('添加订单号成功');
                })
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

    editExpressAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var data = {};

        data.doTaskExtendExpressName = self.post('doTaskExtendExpressName');
        data.doTaskExtendExpressId = self.post('doTaskExtendExpressId');
        data.doTaskExtendDoTaskId = self.post('doTaskExtendDoTaskId');
        data.doTaskExtendTaskId = self.post('doTaskExtendTaskId');
        data.doTaskExtendExpressTime = moment();

        return D('do_task_extend')
          .where({doTaskExtendDoTaskId: data.doTaskExtendDoTaskId})
          .update(data)
          .then(function(res) {
              return self.success('订单号编辑成功');
          })
          .catch(function(err) {
            console.log(err.stack);
            return self.error(err);
          })
      }
    },

    cancelAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var id = self.post('id');
        var doTask;
        return D('do_task')
          .where({id: id})
          .find()
          .then(function(res) {
            doTask = res;

            if (doTask.doTaskStatus == -1) {
              return self.error(500, '请勿重复撤销任务单');
            } else {
              return D('do_task')
                .where({id: id})
                .update({doTaskStatus: -1})
            }
          })
          .then(function() {
            if (doTask.doTaskTerminal == 'phone') {
              return D('task')
                .where({id: doTask.doTaskTaskId})
                .updateDec('taskPhoneDoingCount')
            } else if (doTask.doTaskTerminal == 'pc') {
              return D('task')
                .where({id: doTask.doTaskTaskId})
                .updateDec('taskPcDoingCount')
            }
            return D('task')
              .where({id: doTask.doTaskTaskId})
              .update({'taskStatus': 2})
          })
          .then(function() {
            return D('user')
              .where({id: doTask.doTaskUserId})
              .updateInc('coin')
          })
          .then(function() {
            return D('user')
              .where({id: doTask.doTaskUserId})
              .find()
          })
          .then(function(res) {
            return Log.coin(
              1
              , 1
              , res.coin
              , res.id
              , res.username
              , 1
              , self.ip()
              , '管理员撤销任务单:' + id + '返回1金币');
          })
          .then(function() {
            return self.success('撤销成功');
          })
          .catch(function(err) {
            console.error(err.stack);
            return self.success('撤销失败');
          });
      }
    },

    cancelExpressAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var data = {};

        //todo: 这里的逻辑需要白天清醒的时候写下
        data.doTaskExtendDoTaskId = self.post('doTaskExtendDoTaskId');

        self.success('撤销失败');
      }
    },

    printExpressAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        return D('do_task')
          .join({
            table: 'task'
            , join: 'left'
            , on: {
              'doTaskTaskId': 'id'
            }
          })
          .join({
            table: 'do_task_detail'
            , join: 'left'
            , on: {
              'id': 'doTaskDetailDoTaskId'
            }
          })
          .join({
            table: 'shop'
            , join: 'left'
            , on: {
              'doTaskShopId': 'id'
            }
          })
          .join({
            table: 'account'
            , join: 'left'
            , on: {
              'doTaskAccountId': 'id'
            }
          })
          .select()
          .then(function(res) {
            OutputService.express(res, function(now) {
              return self.success(now);
            });
          })
          .catch(function(err) {
            console.error(err.stack);
          })
      }
    },
  };
});
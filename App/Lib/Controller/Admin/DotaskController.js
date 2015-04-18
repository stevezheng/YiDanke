var moment = require('moment');
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
        var page = self.post('page');

        return D('do_task')
          .order('yi_do_task.id desc')
          .join({
            table: 'task'
            , join: 'left'
            , on: {
              'doTaskTaskId': 'id'
            }
          })
          .join({
            table: 'task_taobao'
            , join: 'left'
            , on: {
              'doTaskTaskId': 'taobaoTaskId'
            }
          })
          .join({
            table: 'task_tmall'
            , join: 'left'
            , on: {
              'doTaskTaskId': 'tmallTaskId'
            }
          })
          .join({
            table: 'task_jd'
            , join: 'left'
            , on: {
              'doTaskTaskId': 'jdTaskId'
            }
          })
          .join({
            table: 'task_extend'
            , join: 'left'
            , on: {
              'doTaskTaskId': 'extendTaskId'
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
            table: 'do_task_extend'
            , join: 'left'
            , on: {
              'id': 'doTaskExtendDoTaskId'
            }
          })
          .join({
            table: 'user'
            , join: 'left'
            , on: {
              'doTaskUserId': 'id'
            }
          })
          .countSelect()
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
  };
});
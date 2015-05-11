var moment = require('moment');
var Log= thinkRequire('LogService');
var _ = require('underscore');
var TaskModel = thinkRequire('TaskModel');
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
          if (key == 'taskStatus') {
            return val;
          } else {
            return ['like', '%' + val + '%'];
          }
        });

        if (!data['taskStatus']) {
          data.taskStatus = ['!=', 0];
        }


        if (data.id) {
          data['yi_task.id'] = data.id;
          delete data.id;
        }

        return D('task')
          .page(page, 20)
          .order('yi_task.id desc')
          .join({
            table: 'task_taobao'
            , join: 'left'
            , on: {
              'id': 'taobaoTaskId'
            }
          })
          .join({
            table: 'task_tmall'
            , join: 'left'
            , on: {
              'id': 'tmallTaskId'
            }
          })
          .join({
            table: 'task_jd'
            , join: 'left'
            , on: {
              'id': 'jdTaskId'
            }
          })
          .join({
            table: 'task_extend'
            , join: 'left'
            , on: {
              'id': 'extendTaskId'
            }
          })
          .join({
            table: 'user'
            , join: 'left'
            , on: {
              'taskUserId': 'id'
            }
          })
          .join({
            table: 'shop'
            , join: 'left'
            , on: {
              'taskShopId': 'id'
            }
          })
          .where(data)
          .countSelect()
          .then(function(res) {
            return self.success(res);
          })
      }
    },

    passAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {}

      if (self.isPost()) {
        var id = self.post('id');

        return D('task')
          .where({id: id})
          .update({taskStatus: 3})
          .then(function(res) {
            return self.success('通过审核成功');
          })
          .catch(function() {
            return self.error(500, '通过审核失败')
          })
      }
    },

    unpassAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {}

      if (self.isPost()) {
        var id = self.post('id');
        var allCoin, allMoney, taskUserId;

        return D('task')
          .where({id: id})
          .find()
          .then(function(res) {
            allCoin = res.taskAllCoin;
            allMoney = res.taskAllMoney;
            taskUserId = res.taskUserId;
            return D('user')
              .where({id: taskUserId})
              .find()
          })
          .then(function(res) {
            self.cUser = res;
            allMoney = Math.abs(allMoney);
            return D('user')
              .where({id: taskUserId})
              .updateField({money: ['exp', 'money+' + allMoney], coin: ['exp', 'coin+' + allCoin]})
          })
          .then(function() {
            var p1 = Log.coin(
              1
              , allCoin
              , (self.cUser.coin + allCoin)
              , self.cUser.id
              , self.cUser.username
              , 1
              , self.ip()
              , '拒绝任务['+id+']返还' + allCoin + '金币'
            );

            var p2 = Log.money(
              1
              , allMoney
              , (self.cUser.money + allMoney)
              , self.cUser.id
              , self.cUser.username
              , 1
              , self.ip()
              , '拒绝任务['+id+']返还' + allMoney+ '元'
            );

            return Promise.all([p1, p2]);
          })
          .then(function() {
            return D('task')
              .where({id: id})
              .update({taskStatus: -1})
              .then(function(res) {
                return self.success('拒绝通过成功');
              })
              .catch(function() {
                return self.error(500, '拒绝通过失败')
              })
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
          .getOne(id)
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
          .where({doTaskTaskId: taskId})
          .select()
          .then(function(res) {
            return self.success(res);
          })
          .catch(function(err) {
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
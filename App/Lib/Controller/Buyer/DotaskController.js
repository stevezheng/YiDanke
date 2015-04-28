var TaskModel = thinkRequire('TaskModel');
var Log = thinkRequire('LogService');
var DoTaskModel = thinkRequire('DoTaskModel');
var UserModel = thinkRequire('UserModel');
var moment = require('moment');

module.exports = Controller("Buyer/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {

      var self = this;
      self.assign('title', '做任务中心');

      if (self.isGet()) {
        var id = self.get('id');
        var user = UserModel();
        self.assign('doTaskId', id);

        user
          .reloadCurrentUser(self)
          .then(function() {
            return D('do_task')
              .join({
                table: 'task'
                , join: 'left'
                , on: {
                  'doTaskTaskId': 'id'
                }
              })
              .where({'yi_do_task.id': id})
              .find()
          })
          .then(function(res) {
            if (res.taskPlatform == 'taobao' || res.taskPlatform == 'tmall') {
              if (res.taskType == 'dingdan') {
                self.display();
              } else if (res.taskType == 'zhitongche') {
                self.display('Buyer:dotask:zhitongche');
              }
            } else if (res.taskPlatform == 'jd') {
              self.display('Buyer:dotask:jd');
            }
          });
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
              return self.error(800, '该已经有正在做的任务了,任务id:' + res.id);
            }

            return doTask
              .hasDoneShop(self.cUser.id, accountId, _task.taskShopName)
          })
          .then(function(res) {
            if (!isEmpty(res)) {
              return self.error(500, '该账号已经做过该店任务了');
            }

            return task
              .taobaoKeywords(taskId)
          })
          .then(function(res) {
            //获取关键词
            var keywords = [];

            if (res.taobaoKey1 != '') {
              for (var i = 0; i < res.taobaoKeyCount1; i++) {
                keywords.push(res.taobaoKey1);
              }
            }
            if (res.taobaoKey2 != '') {
              for (var i = 0; i < res.taobaoKeyCount2; i++) {
                keywords.push(res.taobaoKey2);
              }
            }
            if (res.taobaoKey3 != '') {
              for (var i = 0; i < res.taobaoKeyCount3; i++) {
                keywords.push(res.taobaoKey3);
              }
            }

            if (res.taobaoKey4 != '') {
              for (var i = 0; i < res.taobaoKeyCount4; i++) {
                keywords.push(res.taobaoKey4);
              }
            }

            if (res.taobaoKey5 != '') {
              for (var i = 0; i < res.taobaoKeyCount5; i++) {
                keywords.push(res.taobaoKey5);
              }
            }

            if (res.tmallKey1 != '') {
              for (var i = 0; i < res.tmallKeyCount1; i++) {
                keywords.push(res.tmallKey1);
              }
            }
            if (res.tmallKey2 != '') {
              for (var i = 0; i < res.tmallKeyCount2; i++) {
                keywords.push(res.tmallKey2);
              }
            }
            if (res.tmallKey3 != '') {
              for (var i = 0; i < res.tmallKeyCount3; i++) {
                keywords.push(res.tmallKey3);
              }
            }

            if (res.tmallKey4 != '') {
              for (var i = 0; i < res.tmallKeyCount4; i++) {
                keywords.push(res.tmallKey4);
              }
            }

            if (res.tmallKey5 != '') {
              for (var i = 0; i < res.tmallKeyCount5; i++) {
                keywords.push(res.tmallKey5);
              }
            }
            if (res.jdKey1 != '') {
              for (var i = 0; i < res.jdKeyCount1; i++) {
                keywords.push(res.jdKey1);
              }
            }
            if (res.jdKey2 != '') {
              for (var i = 0; i < res.jdKeyCount2; i++) {
                keywords.push(res.jdKey2);
              }
            }
            if (res.jdKey3 != '') {
              for (var i = 0; i < res.jdKeyCount3; i++) {
                keywords.push(res.jdKey3);
              }
            }

            if (res.jdKey4 != '') {
              for (var i = 0; i < res.jdKeyCount4; i++) {
                keywords.push(res.jdKey4);
              }
            }

            if (res.jdKey5 != '') {
              for (var i = 0; i < res.jdKeyCount5; i++) {
                keywords.push(res.jdKey5);
              }
            }

            var index = res.taskPhoneDoingCount + res.taskPhoneDoneCount
              + res.taskPcDoingCount + res.taskPcDoneCount;

            keyword = keywords[index];

            //调整任务执行数量进度
            if (terminal == 'pc') {
              //todo:需要打日志
              return task
                .addPcDoingCount(taskId)
            }

            if (terminal == 'phone') {
              //todo:需要打日志
              return task
                .addPhoneDoingCount(taskId)
            }
          })
          .then(function() {
            //冻结押金
            //todo:需要打日志
            return D('user')
              .where({id: self.cUser.id})
              .updateDec('coin');
          })
          .then(function() {
            //todo:需要打日志
            return doTask
              .addOne(terminal, self.cUser.id, taskId, accountId, accountName, keyword, _task.taskFee, _task.taskExtendFee, _task.taskShopId, _task.taskShopName)
          })
          .then(function() {
            return Log.coin(
              -1
              , 1
              , (self.cUser.coin - 1)
              , self.cUser.id
              , self.cUser.username
              , 0
              , self.ip()
              , '做任务[' + taskId + '],冻结1金币'
            );
          })
          .then(function(insertId) {
            return self.success(insertId);
          })
          .catch(function(err) {
            console.error(err.stack);
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
              return self.error(500, '金币不足,请先充值');
            }

            //检查任务单是否足够
            if (terminal == 'pc') {
              if (res.taskPcCount - res.taskPcDoingCount - res.taskPcDoneCount < 1) {
                return self.error(500, '电脑端任务单不足');
              }
            }

            if (terminal == 'phone') {
              if (res.taskPhoneCount - res.taskPhoneDoingCount - res.taskPhoneDoneCount < 1) {
                return self.error(500, '手机/Pad端任务单不足');
              }
            }

            return doTask
              .hasDoing(self.cUser.id)
          })
          .then(function(res) {
            if (!isEmpty(res)) {
                return self.error(800, '该已经有正在做的任务了,任务id:' + res.id);
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

    getOneAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {
        var id = self.get('id');
        var doTask = DoTaskModel();

        doTask
          .getOwnOneAllInfo(self.cUser.id ,id)
          .then(function(res) {
            return self.success(res);
          })
      }

      if (self.isPost()) {}
    },
    
    orderAction: function() {
      var self = this;
      self.assign('title', '');
    
      if (self.isGet()) {}
      
      if (self.isPost()) {
        var data = {};
        data.doTaskDetailItemUrl = self.post('itemUrl')
          , data.doTaskDetailDoTaskId = self.post('doTaskId')
          , data.doTaskDetailTaskId = self.post('taskId')
          , data.doTaskDetailItemUrl1 = self.post('itemUrl1')
          , data.doTaskDetailItemUrl2 = self.post('itemUrl2')
          , data.doTaskDetailItemUrl3 = self.post('itemUrl3')
          , data.doTaskDetailItemUrl4 = self.post('itemUrl4')
          , data.doTaskDetailTalkImage = self.post('talkImagefile')
          , data.doTaskDetailOrderImage = self.post('orderImagefile')
          , data.doTaskDetailOrderId = self.post('orderId')
          , data.doTaskDetailOrderTime = self.post('orderTime')
          , data.doTaskDetailOrderMoney = self.post('orderMoney');

        return D('do_task_detail')
          .add(data)
          .then(function(insertId) {
            return D('do_task')
              .where({id: data.doTaskDetailDoTaskId})
              .update({doTaskStatus: 1})
          })
          .then(function() {
            return self.success('提交成功');
          })
      }
    },
  };
});
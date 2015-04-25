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

        return D('task')
          .where({id: id})
          .update({taskStatus: -1})
          .then(function(res) {
            return self.success('拒绝通过成功');
          })
          .catch(function() {
            return self.error(500, '拒绝通过失败')
          })
      }
    },
    
  };
});
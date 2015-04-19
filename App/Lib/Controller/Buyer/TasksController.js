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
  };
});
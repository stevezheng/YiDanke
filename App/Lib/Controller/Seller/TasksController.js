var DoTask = thinkRequire('DoTaskModel');
var Task = thinkRequire('TaskModel');

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
        var task = Task();

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
  };
});
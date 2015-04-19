var TaskModel = thinkRequire('TaskModel');
module.exports = Controller("Seller/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '任务列表');

      if (self.isGet()) {
        self.display();
      }

      if (self.isPost()) {}
    },

    allAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {
        var task = TaskModel();

        task
          .allPass()
          .then(function(res) {
            return self.success(res);
          })
      }

      if (self.isPost()) {}
    },
  };
});
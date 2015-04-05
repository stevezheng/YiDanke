/**
 * controller
 * @return 
 */
module.exports = Controller("Buyer/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '个人中心');

      if (self.isGet()) {
        self.display();
      }

      if (self.isPost()) {}
    },
    tasksAction: function() {
      var self = this;
      self.assign('title', '我的任务');

      if (self.isGet()) {
        self.display();
      }

      if (self.isPost()) {}
    },
  };
});
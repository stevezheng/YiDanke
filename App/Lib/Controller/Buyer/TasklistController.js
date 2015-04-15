module.exports = Controller("Buyer/BaseController", function(){
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
  };
});
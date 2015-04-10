module.exports = Controller("Seller/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '发布任务');

      if (self.isGet()) {
        self.display();
      }

      if (self.isPost()) {

      }
    },
  };
});
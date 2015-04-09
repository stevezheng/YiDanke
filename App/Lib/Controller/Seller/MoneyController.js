/**
 * controller
 * @return 
 */
module.exports = Controller("Seller/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '资金管理');

      if (self.isGet()) {
        self.display();
      }

      if (self.isPost()) {}
    },
  };
});
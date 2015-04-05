/**
 * controller
 * @return 
 */
module.exports = Controller("Buyer/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '绑定账号');

      if (self.isGet()) {
        self.display();
      }

      if (self.isPost()) {}
    },
  };
});
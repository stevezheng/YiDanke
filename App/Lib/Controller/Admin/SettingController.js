var moment = require('moment');
module.exports = Controller("Admin/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '系统设置');

      if (self.isGet()) {
        return self.display();
      }

      if (self.isPost()) {
      }
    },
  };
});
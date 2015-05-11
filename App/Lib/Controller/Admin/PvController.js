var moment = require('moment');
var getclicks = thinkRequire('CrazyClickService').getClicks;
module.exports = Controller("Admin/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '流量管理');

      if (self.isGet()) {
        return self.display();
      }

      if (self.isPost()) {
      }
    },

    getclicksAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {

      }

      if (self.isPost()) {
        var id = self.post('id')
          , date = self.post('date')
          , pageNo = self.post('pageNo')
          , pageSize = self.post('pageSize');
        
        getclicks(id, date, pageNo, pageSize, function(res) {
          return self.success(res);
        })
      }
    },
  };
});
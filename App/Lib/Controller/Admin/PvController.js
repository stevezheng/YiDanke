var moment = require('moment');
var _ = require('underscore');
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
        var page = self.post('page')
          , data = self.post('data') || {};

        data = _.mapObject(data, function(val, key) {
          return ['like', '%' + val + '%'];
        });

        return D('crazyclick_log')
          .order('id desc')
          .page(page, 20)
          .where(data)
          .countSelect()
          .then(function(res) {
            return self.success(res);
          })
          .catch(function(err) {
            console.error(err.stack);
            return self.error(err);
          })
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
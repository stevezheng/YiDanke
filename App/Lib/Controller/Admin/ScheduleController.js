var moment = require('moment');
var _ = require('underscore');

module.exports = Controller(function() {
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
        return D('do_task')
          .where({doTaskStatus: 4})
          .select()
          .then(function(res) {
            var _res = _.filter(res, function(item) {
              if (item.doTaskExtendGoodTime > moment().subtract(48, 'h') || item.doTaskExtendExpressTime > moment().subtract(1, 'h')) {
                return item;
              }
            });
            console.log(_res);
            return self.success('work');
          })
      }

      if (self.isPost()) {}
    },
  }
})
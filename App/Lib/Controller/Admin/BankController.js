var moment = require('moment');
module.exports = Controller("Admin/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '提现账号');

      if (self.isGet()) {
        return self.display();
      }

      if (self.isPost()) {
        var page = self.post('page');

        return D('bank')
          .field(['yi_bank.*', 'yi_user.username', 'yi_user.type'])
          .join({
            table: 'user'
            , join: 'left'
            , on: {
              'bankUserId': 'id'
            }
          })
          .order('id desc')
          .page(page, 20)
          .countSelect()
          .then(function(res) {
            return self.success(res);
          })
      }
    },
  };
});
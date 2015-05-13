var moment = require('moment');
var _ = require('underscore');
var getclicks = thinkRequire('CrazyClickService').getClicks;
var crazyClick = thinkRequire('CrazyClickService').crazyClick;
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
    
    addAction: function() {
      var self = this;
      self.assign('title', '');
    
      if (self.isGet()) {
        return self.display();
      }
      
      if (self.isPost()) {
        var pv = self.http.post;
        console.log(pv);
        crazyClick.request('tbpc/add', pv, function(_res) {
          _res = _res.data;
          console.log(_res);
          return D('crazyclick_log')
            .add({
              userId: '0'
              , username: '管理员:' + self.cAdmin.username
              , taskId: '0'
              , kwd: _res.kwd
              , nid: _res.nid
              , appkey: _res.appkey
              , platform: _res.platform
              , shop_type: _res.shop_type
              , times: _res.times
              , sleep_time: _res.sleep_time
              , click_start_input: _res.click_start_input
              , click_end_input: _res.click_end_input
              , status: _res.status
              , begin_time: _res.begin_time
              , end_time: _res.end_time
              , created_at: _res.created_at
              , updated_at: _res.updated_at
              , click_start: _res.click_start
              , click_end: _res.click_end
              , click_interval: _res.click_interval
              , rid: _res.id
            })
            .then(function() {
              return self.success('新增成功');
            })
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
var php = require('phpjs');
var request = require('request');
var crypto = require('crypto');
var moment = require('moment');
var _ = require('underscore');

function getTaobaoId(url) {
  var id = null;

  //url = url || 'http://detail.tmall.com/item.htm?spm=0.0.0.0.S2rhRj&id=43732747325';

  var urlList = url.split('&');

  for (var i = 0; i < urlList.length; i++) {
    var u = urlList[i];
    if (u.slice(0,3) == 'id=') {
      id = u.slice(3);
    }
  }

  return id;
}

var md5 = function (str) {
  var instance = crypto.createHash('md5');
  instance.update(str, 'utf8');
  return instance.digest('hex');
};

var CrazyClickService = function (appkey, appsecret, baseUrl) {
  this.appkey = appkey;
  this.appsecret = appsecret;
  this.baseUrl = baseUrl;
};

CrazyClickService.prototype = {
  constructor: CrazyClickService,
  request: function (method, data, cb) {
    //return false; //暂停流量功能
    var self = this;
    var sysParams = {
      appkey: self.appkey
      , timestamp: moment().unix()
    };

    var params = php.array_merge(sysParams, data);
    params['sign'] = self._genSign(method, params);
    console.log(params['sign']);

    var requestUrl = self.baseUrl + method;

    request.post(requestUrl, {form: params}, function (err, res, body) {
      try {
        var r = php.json_decode(body, true);
        cb(r);
      } catch(ex) {
        console.error(ex);
      };
    });
  },
  _genSign: function (method, params) {
    var self = this;
    var keys = _.keys(params);
    keys.sort();

    var signString = method.trim();
    for (var i = 0; i < keys.length; i++) {
      signString += params[keys[i]]
    }

    signString = md5((signString + md5(self.appsecret)).trim());
    return signString.toLowerCase();
  }
};

var config = {
  appkey: 'shenyuanbao'
  , appsecret: '44719895eb93a812708449bbdebcb41c'
  , baseUrl: 'http://api.aymoo.com/api/'
};

var crazyClick = new CrazyClickService(config.appkey, config.appsecret, config.baseUrl);

var getClicks = function(id, date, pageNo, pageSize, cb) {
  var data = {
    id: id
    , date: date
    , page_no: pageNo
    , pageSize: pageSize
  };

  crazyClick.request('statistics/getclicks', data, function(res) {
    console.log(res);
    if (cb) {
      cb(res);
    }
  })
};

var run = function(shopPlatform, task, cb) {
  var id = getTaobaoId(task.taskUrl);

  var data = {
    'nid': id
    , 'shop_type': shopPlatform == 'taobao'? 'c': 'b'
    , 'path2': 0
    , 'sleep_time': 120
    , 'click_start': moment().add(1, 'h').hour()
    , 'click_end': 23
    , 'begin_time': moment().format('YYYY-MM-DD')
    , 'end_time': moment().format('YYYY-MM-DD')
  };

  if (task.taobaoKey1) {
    data.kwd = task.taobaoKey1;
    data.times = parseInt(task.taobaoKeyCount1 / task.taskTotalCount * task.taskPV);
    data.path1 = 100;
    data.path3 = 0;

    crazyClick.request('tbpc/add', data, function(res) {
      console.log(res);
      if (cb) {
        cb(res);
      }
    })
  }

  if (task.taobaoKey2) {
    data.kwd = task.taobaoKey2;
    data.times = parseInt(task.taobaoKeyCount2 / task.taskTotalCount * task.taskPV);
    data.path1 = 100;
    data.path3 = 0;

    crazyClick.request('tbpc/add', data, function(res) {
      console.log(res);
      if (cb) {
        cb(res);
      }
    })
  }

  if (task.taobaoKey3) {
    data.kwd = task.taobaoKey3;
    data.times = parseInt(task.taobaoKeyCount3 / task.taskTotalCount * task.taskPV);
    data.path1 = 100;
    data.path3 = 0;

    crazyClick.request('tbpc/add', data, function(res) {
      console.log(res);
      if (cb) {
        cb(res);
      }

    })
  }

  if (task.taobaoKey4) {
    data.kwd = task.taobaoKey4;
    data.times = parseInt(task.taobaoKeyCount4 / task.taskTotalCount * task.taskPV);
    data.path1 = 100;
    data.path3 = 0;

    crazyClick.request('tbpc/add', data, function(res) {
      console.log(res);
      if (cb) {
        cb(res);
      }
    })
  }

  if (task.taobaoKey5) {
    data.kwd = task.taobaoKey5;
    data.times = parseInt(task.taobaoKeyCount5 / task.taskTotalCount * task.taskPV);
    data.path1 = 100;
    data.path3 = 0;

    crazyClick.request('tbpc/add', data, function(res) {
      console.log(res);
      if (cb) {
        cb(res);
      }
    })
  }

  if (task.tmallKey1) {
    data.kwd = task.tmallKey1;
    data.times = parseInt(task.tmallKeyCount1 / task.taskTotalCount * task.taskPV);
    data.path3 = 100;
    data.path1 = 0;

    crazyClick.request('tbpc/add', data, function(res) {
      console.log(res);
      if (cb) {
        cb(res);
      }
    })
  }

  if (task.tmallKey2) {
    data.kwd = task.tmallKey2;
    data.times = parseInt(task.tmallKeyCount2 / task.taskTotalCount * task.taskPV);
    data.path3 = 100;
    data.path1 = 0;

    crazyClick.request('tbpc/add', data, function(res) {
      console.log(res);
      if (cb) {
        cb(res);
      }
    })
  }

  if (task.tmallKey3) {
    data.kwd = task.tmallKey3;
    data.times = parseInt(task.tmallKeyCount3 / task.taskTotalCount * task.taskPV);
    data.path3 = 100;
    data.path1 = 0;

    crazyClick.request('tbpc/add', data, function(res) {
      console.log(res);
      if (cb) {
        cb(res);
      }
    })
  }

  if (task.tmallKey4) {
    data.kwd = task.tmallKey4;
    data.times = parseInt(task.tmallKeyCount4 / task.taskTotalCount * task.taskPV);
    data.path3 = 100;
    data.path1 = 0;

    crazyClick.request('tbpc/add', data, function(res) {
      console.log(res);
      if (cb) {
        cb(res);
      }
    })
  }

  if (task.tmallKey5) {
    data.kwd = task.tmallKey5;
    data.times = parseInt(task.tmallKeyCount5 / task.taskTotalCount * task.taskPV);
    data.path3 = 100;
    data.path1 = 0;

    crazyClick.request('tbpc/add', data, function(res) {
      console.log(res);
      if (cb) {
        cb(res);
      }
    })
  }
};

//var config = {
//  appkey: 'test'
//  , appsecret: 'a9d11a189099ac9b483ab982e849e939'
//  , baseUrl: 'http://api.sandbox.aymoo.com/api/'
//};
//
//var crazyClick = new CrazyClickService(config.appkey, config.appsecret, config.baseUrl);
//
//var method = 'tbpc/add';
//
//var path1 = 0;
//var path3 = 0;
//var terminal = 0;
//if (terminal == 0) {
//  path1 = 100;
//} else {
//  path3 = 100;
//}
//var data = {
//  'kwd': '奶粉',
//  'nid': 12345678,
//  'shop_type': 'c',
//  'times': 10,
//  'path1': path1,
//  'path2': 0,
//  'path3': path3,
//  'sleep_time': 120,
//  'click_start': moment().add(1, 'h').hour(),
//  'click_end': 23,
//  'begin_time': moment().format('YYYY-MM-DD'),
//  'end_time': moment().format('YYYY-MM-DD')
//};
//console.log(data);
////var data = {
////  'kwd': '巴旦木',
////  'nid': '12345678',
////  'shop_type': 'b',
////  'times': 2,
////  'path1': 10,
////  'path2': 70,
////  'path3': 20,
////  'sleep_time': 60,
////  'click_start': 8,
////  'click_end': 23,
////  'begin_time': '2014-09-20',
////  'end_time': '2014-10-20'
////};
////
//crazyClick.request(method, data, function(res) {
//  console.log(res);
//});


module.exports = {
  run: run
  , getClicks: getClicks
  , crazyClick: crazyClick
};


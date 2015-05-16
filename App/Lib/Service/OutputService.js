var ejsExcel = require("ejsexcel");
var fs = require("fs");
var exlPath = RESOURCE_PATH + '/resource/excel/';
var moment = require('moment');

var statusMap = {
  doTaskStatus: {
    '-1': '已撤销'
    , '0': '待完成'
    , '1': '待添加订单号'
    , '2': '待发货'
    , '3': '待收货'
    , '4': '待退款'
    , '5': '待确认退款'
    , '6': '已完成'
    , '8': '已申请提现'
    , '9': '已提现'
  }
};

var OutputService = function() {
};

OutputService.prototype = {
  constructor: OutputService
};

/**
 * 执行导出单个任务
 * @param doTask 任务信息
 * @param seller 商家信息
 * @param cb 回调
 */
OutputService.single = function(doTask, seller, cb) {
  var exlBuf = fs.readFileSync(exlPath + "kuaijie_new.xlsx");
  var sellerCityInfo = seller.city.split('|');
  var buyerCityInfo = doTask.city.split('|');

  var data = {
    sellerName: seller.shopName
    , sellerProvince: sellerCityInfo[0]
    , sellerCity: sellerCityInfo[1]
    , sellerArea: ''
    , sellerId: seller.id
    , expdoTasksId: doTask.expdoTasksId
    , sellerShopName: seller.shopName
    , sellerAdddoTasks: seller.adddoTasks
    , sellerPhone: seller.phone
    , sellerAdddoTasksId: ''
    , buyerPhone: doTask.accountPhone
    , buyerId: doTask.accountRealName
    , buyerAdddoTasks: doTask.accountAdddoTasks
    , buyerAdddoTasksId: ''
    , buyerName: doTask.accountRealName
    , buyerProvince: buyerCityInfo[0]
    , buyerCity: buyerCityInfo[1]
    , buyerArea: ''
  };

  ejsExcel.renderExcelCb(exlBuf, data, function(exlBuf2){
    fs.writeFileSync(exlPath + doTask.id + ".xlsx", exlBuf2);
    if (cb) {
      cb();
    }
    //return self.success(id);
  });
};

OutputService.multi = function(doTaskData, cb) {
  var multiData = [];
  var exlMultiBuf = fs.readFileSync(exlPath + "kuaijie_multi.xlsx");

  var now = moment().format('YYYY-MM-DD_HH:mm:ss');

  for (var i = 0; i < doTaskData.length; i++) {
    var doTaskSingle = doTaskData[i];
    var seller = doTaskSingle.seller;
    var doTask = doTaskSingle.doTask;

    var sellerCityInfo = seller.city.split('|');
    var buyerCityInfo = doTask.city.split('|');

    var data = {
      seller: seller
      , doTask: doTask
      , payMoney: doTask.totalPrice + doTask.totalPrice1 + doTask.totalPrice2
      , sellerName: seller.shopName
      , sellerUsername: seller.username
      , sellerProvince: sellerCityInfo[0]
      , sellerCity: sellerCityInfo[1]
      , sellerArea: ''
      , sellerId: seller.id
      , expdoTasksId: doTask.expdoTasksId
      , sellerShopName: seller.shopName
      , sellerAddress: seller.address
      , sellerPhone: seller.phone
      , buyerPhone: doTask.accountPhone
      , buyerId: doTask.accountRealName
      , buyerAddress: doTask.accountAddress
      , buyerName: doTask.accountRealName
      , buyerProvince: buyerCityInfo[0]
      , buyerCity: buyerCityInfo[1]
      , buyerArea: ''
    };

    multiData.push(data);
  }
  

  ejsExcel.renderExcelCb(exlMultiBuf, multiData, function(exlMultiBuf2){
    fs.writeFileSync(exlPath + now + ".xlsx", exlMultiBuf2);
    if (cb) {
      cb(now);
    }
    //return self.success(id);
  });
};

OutputService.express = function(doTaskData, cb) {
  var multiData = [];
  var exlMultiBuf = fs.readFileSync(exlPath + "express_base.xlsx");

  var now = moment().format('YYYY-MM-DD_HH:mm:ss');

  for (var i = 0; i < doTaskData.length; i++) {
    var doTaskSingle = doTaskData[i];

    var data = doTaskSingle;

    try {
      data.shopAddressDetail = data.shopProvince + data.shopCity + data.shopArea + data.shopAddress;
      data.accountAddressDetail = data.accountProvince + data.accountCity + data.accountArea + data.accountAddress;
    } catch (ex) {
      console.error(ex);
    }

    multiData.push(data);
  }


  ejsExcel.renderExcelCb(exlMultiBuf, multiData, function(exlMultiBuf2){
    fs.writeFileSync(exlPath + 'express-' + now + ".xlsx", exlMultiBuf2);
    if (cb) {
      cb(now);
    }
    //return self.success(id);
  });
};

OutputService.order = function(doTaskData, cb) {
  var multiData = [];
  var exlMultiBuf = fs.readFileSync(exlPath + "order_base.xlsx");

  var now = moment().format('YYYY-MM-DD_HH:mm:ss');

  for (var i = 0; i < doTaskData.length; i++) {
    var doTaskSingle = doTaskData[i];

    var data = doTaskSingle;

    try {
      data.doTaskCreateTime = moment(data.doTaskCreateTime).format('YYYY-MM-DD HH:mm:ss');
      data.doTaskStatus = statusMap.doTaskStatus[data.doTaskStatus];
    } catch (ex) {
      console.error(ex);
    }

    multiData.push(data);
  }


  ejsExcel.renderExcelCb(exlMultiBuf, multiData, function(exlMultiBuf2){
    fs.writeFileSync(exlPath + 'order-' + now + ".xlsx", exlMultiBuf2);
    if (cb) {
      cb(now);
    }
    //return self.success(id);
  });
};

module.exports = OutputService;

var MoneyModel = thinkRequire('MoneyModel');
var UserModel = thinkRequire('UserModel');
var Kuaiqian = thinkRequire('KuaiqianPayService');
var Log = thinkRequire('LogService');
var moment = require('moment');

module.exports = Controller("Buyer/BaseController", function(){
  "use strict";
  return {
    indexAction: function() {
      var self = this;
      self.assign('title', '资金管理');

      if (self.isGet()) {
        var user = UserModel();
        user.reloadCurrentUser(self)
          .then(function () {
            self.display();
          })
      }

      if (self.isPost()) {}
    },

    kuaiqianAction: function () {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {
        var moneyType = self.get('type');
        var moneyValue = Math.ceil(self.get('value'));
        var orderAmount = Math.ceil(self.get('value')) * 100;

        var money = MoneyModel();
        money
          .addOne(moneyType, 'kuaiqian', self.cUser.id, moneyValue, '')
          .then(function (insertId) {
            var config = {
              //测试
              //merchantAcctId: "1001213884201",

              //正式
              merchantAcctId: "1002429517101",
              inputCharset: "1",

              pageUrl: "",
              //pageUrl: "http://bbs.yijia90.com/buyer/money/kuaiqianrecieve",

              //bgUrl: "",
              bgUrl: "http://www.yijia90.com/buyer/money/kuaiqianrecieve",

              version: "v2.0",
              language: "1",
              signType: "4",
              payerName: "",
              payerContactType: "1",
              payerContact: self.cUser.email || "2532987@qq.com",
              orderId: moment().format("YYYYMMDDHHmmss"),
              orderAmount: orderAmount || "1",
              orderTime: moment().format("YYYYMMDDHHmmss"),
              productName: "www.yijia90.com",
              productNum: "1",
              productId: insertId || "55558888",
              productDesc: 'buyer' || "",
              ext1: 'buyer',
              ext2: insertId + ',buyer',
              payType: "00",
              bankId: "",
              redoFlag: "",
              pid: ""
            };

            var kuaiqian = new Kuaiqian(config);
            var sign = kuaiqian.getSign();

            config.signMsg = sign;

            self.assign('money', moneyValue);
            self.assign('data', config);
            return self.display();
          })
          .catch(function (err) {
            self.assign('warning', err);
            self.display('Home:index:warning')
          })
      }

      if (self.isPost()) {
      }
    },

    kuaiqianrecieveAction: function () {
      var self = this;
      self.assign('title', '');
      function kq_ck_null(kq_va, kq_na) {
        if (kq_va == '') {
          return kq_va = '';
        } else {
          return kq_va = kq_na + '=' + kq_va + '&';
        }
      }

      var kq_check_all_para = kq_ck_null(self.get('merchantAcctId'), 'merchantAcctId');
      kq_check_all_para += kq_ck_null(self.get('version'), 'version');
      kq_check_all_para += kq_ck_null(self.get('language'), 'language');
      kq_check_all_para += kq_ck_null(self.get('signType'), 'signType');
      kq_check_all_para += kq_ck_null(self.get('payType'), 'payType');
      kq_check_all_para += kq_ck_null(self.get('bankId'), 'bankId');
      kq_check_all_para += kq_ck_null(self.get('orderId'), 'orderId');
      kq_check_all_para += kq_ck_null(self.get('orderTime'), 'orderTime');
      kq_check_all_para += kq_ck_null(self.get('orderAmount'), 'orderAmount');
      kq_check_all_para += kq_ck_null(self.get('dealId'), 'dealId');
      kq_check_all_para += kq_ck_null(self.get('bankDealId'), 'bankDealId');
      kq_check_all_para += kq_ck_null(self.get('dealTime'), 'dealTime');
      kq_check_all_para += kq_ck_null(self.get('payAmount'), 'payAmount');
      kq_check_all_para += kq_ck_null(self.get('fee'), 'fee');
      kq_check_all_para += kq_ck_null(self.get('ext1'), 'ext1');
      kq_check_all_para += kq_ck_null(self.get('ext2'), 'ext2');
      kq_check_all_para += kq_ck_null(self.get('payResult'), 'payResult');
      kq_check_all_para += kq_ck_null(self.get('errCode'), 'errCode');

      var signMsg = self.get('signMsg');
      var ext1 = self.get('ext1');
      var moneyId = self.get('ext2').split(',')[0];
      var dealId = self.get('dealId');

      var ok = Kuaiqian.ok(kq_check_all_para, signMsg);

      if (ok == 1) {
        switch (self.get('payResult')) {
          case '10':
            /**
             * 此处做商户逻辑处理
             * 1.获取订单id
             * 2.判断该订单是否有更新过
             *  2.11 没有更新过
             *  2.12 给用户加钱
             *  2.13 更新订单状态
             *
             *  2.01 更新过
             *  2.02 判断为重复订单
             */
            var money = MoneyModel();
            money
              .where({id: moneyId})
              .find()
              .then(function (res) {
                if (res.moneyStatus == 0) {
                  var moneyUserId = res.moneyUserId;
                  var moneyValue = res.moneyValue;
                  var moneyType = res.moneyType;

                  return D('user')
                    .where({id: moneyUserId})
                    .then(function(res) {
                      self.cUser = res;

                      var user = UserModel();

                      if (moneyType == 0) {
                        user
                          .addCoin(moneyUserId, moneyValue)
                          .then(function () {
                            return money
                              .pass(res.id, res.moneyUserId, dealId)
                          })
                          .then(function() {
                            return Log.coin(
                              1
                              , moneyValue
                              , (self.cUser.coin + moneyValue)
                              , self.cUser.id
                              , self.cUser.username
                              , 0
                              , self.ip()
                              , '通过快钱充值' + moneyValue + '金币'
                            )
                          })
                          .then(function () {
                            //var r = '<result>1</result> <redirecturl>http://baidu.com</redirecturl>';
                            var r = '<result>1</result> <redirecturl>http://www.yijia90.com/'+ext1+'</redirecturl>';
                            return self.echo(r);
                          })
                          .catch(function(err) {
                            console.error(err);
                          })
                      } else if (moneyType == 1) {
                        user
                          .addMoney(moneyUserId, moneyValue)
                          .then(function () {
                            return money
                              .pass(res.id, res.moneyUserId, dealId)
                          })
                          .then(function() {
                            return Log.money(
                              1
                              , moneyValue
                              , (self.cUser.money + moneyValue)
                              , self.cUser.id
                              , self.cUser.username
                              , 0
                              , self.ip()
                              , '通过快钱充值' + moneyValue + '元'
                            )
                          })
                          .then(function () {
                            //var r = '<result>1</result> <redirecturl>http://baidu.com</redirecturl>';
                            var r = '<result>1</result> <redirecturl>http://www.yijia90.com/'+ext1+'</redirecturl>';
                            console.log(r);
                            return self.echo(r);
                          })
                          .catch(function(err) {
                            console.error(err);
                          })
                      }
                    })
                } else {
                  var r = '<result>0</result> <redirecturl>http://www.yijia90.com/home/money/error</redirecturl>'
                  return self.end(r);
                }
              });
          default:
            var r = '<result>0</result> <redirecturl>http://www.yijia90.com/home/money/error</redirecturl>'
            return self.end(r);

        }
      } else {
        var r = '<result>0</result> <redirecturl>http://www.yijia90.com/home/money/error</redirecturl>'
        return self.end(r);
      }
    },

    alipayAction: function () {
      var self = this;
      self.assign('title', '');

      if (self.isGet()) {
        var payMoney = self.get('value');
        var type = self.get('type');

        self.assign('payMoney', payMoney);
        self.assign('type', type);

        self.display();
      }

      if (self.isPost()) {
        var moneyOrder = self.post('orderId');
        var moneyType = self.post('type');
        var moneyValue = self.post('money');

        //创建订单
        var money = MoneyModel();

        money
          .addOne(moneyType, 'alipay', self.cUser.id, moneyValue, moneyOrder)
          .then(function () {
            return self.success('支付成功，请耐心等待审核');
          })
          .catch(function (err) {
            console.log(err);
            return self.error(500, '支付失败', err);
          })
      }
    }
  };
});
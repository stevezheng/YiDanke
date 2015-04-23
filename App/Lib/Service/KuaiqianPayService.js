var php = require('phpjs');
var moment = require('moment');
var fs = require('fs');
var crypto = require('crypto');

function kq_ck_null(kq_va, kq_na) {
  if (kq_va == '') {
    return kq_va = '';
  } else {
    return kq_va = kq_na + '=' + kq_va + '&';
  }
}

var KuaiqianPayService = function (config) {
  this.config = config || {};
  this.basePath = RESOURCE_PATH + '/resource/';
};

KuaiqianPayService.prototype = {
  constructor: KuaiqianPayService,

  getSign: function () {
    var self = this;
    //人民币网关账号，该账号为11位人民币网关商户编号+01,该参数必填。
    var merchantAcctId = self.config.merchantAcctId;
    //编码方式，1代表 UTF-8; 2 代表 GBK; 3代表 GB2312 默认为1,该参数必填。
    var inputCharset = self.config.inputCharset;
    //接收支付结果的页面地址，该参数一般置为空即可。
    var pageUrl = self.config.pageUrl;
    //var pageUrl = self.config. ||  "http://127.0.0.1/kuaiqian/recieve.php";
    //服务器接收支付结果的后台地址，该参数务必填写，不能为空。
    //var bgUrl = self.config. ||  "";
    var bgUrl = self.config.bgUrl;
    //网关版本，固定值：v2.0,该参数必填。
    var version = self.config.version;
    //语言种类，1代表中文显示，2代表英文显示。默认为1,该参数必填。
    var language = self.config.language;
    //签名类型,该值为4，代表PKI加密方式,该参数必填。
    var signType = self.config.signType;
    //支付人姓名,可以为空。
    var payerName = self.config.payerName;
    //支付人联系类型，1 代表电子邮件方式；2 代表手机联系方式。可以为空。
    var payerContactType = self.config.payerContactType;
    //支付人联系方式，与payerContactType设置对应，payerContactType为1，则填写邮箱地址；payerContactType为2，则填写手机号码。可以为空。
    var payerContact = self.config.payerContact;
    //商户订单号，以下采用时间来定义订单号，商户可以根据自己订单号的定义规则来定义该值，不能为空。
    var orderId = self.config.orderId;
    //订单金额，金额以“分”为单位，商户测试以1分测试即可，切勿以大金额测试。该参数必填。
    var orderAmount = self.config.orderAmount;
    //订单提交时间，格式：yyyyMMddHHmmss，如：20071117020101，不能为空。
    var orderTime = self.config.orderTime;
    //商品名称，可以为空。
    var productName = self.config.productName;
    //商品数量，可以为空。
    var productNum = self.config.productNum;
    //商品代码，可以为空。
    var productId = self.config.productId;
    //商品描述，可以为空。
    var productDesc = self.config.productDesc;
    //扩展字段1，商户可以传递自己需要的参数，支付完快钱会原值返回，可以为空。
    var ext1 = self.config.ext1;
    //扩展自段2，商户可以传递自己需要的参数，支付完快钱会原值返回，可以为空。
    var ext2 = self.config.ext2;
    //支付方式，一般为00，代表所有的支付方式。如果是银行直连商户，该值为10，必填。
    var payType = self.config.payType;
    //银行代码，如果payType为00，该值可以为空；如果payType为10，该值必须填写，具体请参考银行列表。
    var bankId = self.config.bankId;
    //同一订单禁止重复提交标志，实物购物车填1，虚拟产品用0。1代表只能提交一次，0代表在支付不成功情况下可以再提交。可为空。
    var redoFlag = self.config.redoFlag;
    //快钱合作伙伴的帐户号，即商户编号，可为空。
    var pid = self.config.pid;
    // signMsg 签名字符串 不可空，生成加密签名串
    
    var kq_all_para = kq_ck_null(inputCharset, 'inputCharset');
    kq_all_para += kq_ck_null(pageUrl, "pageUrl");
    kq_all_para += kq_ck_null(bgUrl, 'bgUrl');
    kq_all_para += kq_ck_null(version, 'version');
    kq_all_para += kq_ck_null(language, 'language');
    kq_all_para += kq_ck_null(signType, 'signType');
    kq_all_para += kq_ck_null(merchantAcctId, 'merchantAcctId');
    kq_all_para += kq_ck_null(payerName, 'payerName');
    kq_all_para += kq_ck_null(payerContactType, 'payerContactType');
    kq_all_para += kq_ck_null(payerContact, 'payerContact');
    kq_all_para += kq_ck_null(orderId, 'orderId');
    kq_all_para += kq_ck_null(orderAmount, 'orderAmount');
    kq_all_para += kq_ck_null(orderTime, 'orderTime');
    kq_all_para += kq_ck_null(productName, 'productName');
    kq_all_para += kq_ck_null(productNum, 'productNum');
    kq_all_para += kq_ck_null(productId, 'productId');
    kq_all_para += kq_ck_null(productDesc, 'productDesc');
    kq_all_para += kq_ck_null(ext1, 'ext1');
    kq_all_para += kq_ck_null(ext2, 'ext2');
    kq_all_para += kq_ck_null(payType, 'payType');
    kq_all_para += kq_ck_null(bankId, 'bankId');
    kq_all_para += kq_ck_null(redoFlag, 'redoFlag');
    kq_all_para += kq_ck_null(pid, 'pid');

    kq_all_para = php.substr(kq_all_para,0, kq_all_para.length - 1);

    //正式版
    var private_key = fs.readFileSync(self.basePath + '/key/99bill-rsa.pem');

    //测试版
    //var private_key = fs.readFileSync(self.basePath + '/keybak/99bill-rsa.pem');

    var signer = crypto.createSign('RSA-SHA1');
    signer.update(kq_all_para);
    var sign = signer.sign(private_key,'base64');

    return sign;
  },

  recieve: function () {

  }
};

function checkSignature(data, sig) {
  var basePath = RESOURCE_PATH + '/resource/';
  //正式版
  var keyPath = basePath + '/key/99bill.cert.rsa.20340630.cer';

  //测试版
  //var keyPath = basePath + '/keybak/99bill[1].cert.rsa.20140803.cer';
  var key = fs.readFileSync(keyPath);

  var verifier = crypto.createVerify('RSA-SHA1');
  verifier.update(data);
  var res = verifier.verify(key, sig, 'base64');

  if (res) {
    return true;
  } else {
    return false;
  }
}

KuaiqianPayService.ok = function(kq_all_para, signMsg) {
    kq_all_para = php.substr(kq_all_para,0, kq_all_para.length - 1);

    return checkSignature(kq_all_para, signMsg);
};

module.exports = KuaiqianPayService;
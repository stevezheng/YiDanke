function coin(type, value, balance, userId, username, userType, ip, commnet) {
  try {
    value = value.toFixed(2);
  } catch (ex) {}
  return D('log_coin')
    .add({
      logCoinType: type
      , logCoin: value
      , logCoinBalance: balance
      , logCoinUserId: userId
      , logCoinUserType: userType
      , logCoinUserName: username
      , logCoinIP: ip
      , logCoinComment: commnet
    })
}

function money(type, value, balance, userId, username, userType, ip, commnet) {
  try {
    value = value.toFixed(2);
  } catch (ex) {}
  return D('log_money')
    .add({
      logMoneyType: type
      , logMoney: value
      , logMoneyBalance: balance
      , logMoneyUserId: userId
      , logMoneyUserType: userType
      , logMoneyUserName: username
      , logMoneyIP: ip
      , logMoneyComment: commnet
    })
}

function withdraw(type, status, value, balance, userId, username, userType, ip, commnet) {
  try {
    value = value.toFixed(2);
  } catch (ex) {}
  return D('log_withdraw')
    .add({
      logWithdrawType: type
      , logWithdrawStatus: status
      , logWithdraw: value
      , logWithdrawBalance: balance
      , logWithdrawUserId: userId
      , logWithdrawUserType: userType
      , logWithdrawUserName: username
      , logWithdrawIP: ip
      , logWithdrawComment: commnet
    })
}

function member(type, value, balance, userId, username, userType, ip, commnet) {
  try {
    value = value.toFixed(2);
  } catch (ex) {}
  return D('log_member')
    .add({
      logMemberType: type
      , logMember: value
      , logMemberBalance: balance
      , logMemberUserId: userId
      , logMemberUserType: userType
      , logMemberUserName: username
      , logMemberIP: ip
      , logMemberComment: commnet
    })
}

function pv(type, value, balance, userId, username, userType, ip, commnet) {
  try {
    value = value.toFixed(2);
  } catch (ex) {}
  return D('log_pv')
    .add({
      logPVType: type
      , logPV: value
      , logPVBalance: balance
      , logPVUserId: userId
      , logPVUserType: userType
      , logPVUserName: username
      , logPVIP: ip
      , logPVComment: commnet
    })
}

function crazyClick(res, taskId, self) {
    var data = res.data;
    data.userId = self.cUser.id;
    data.username = self.cUser.username;
    data.taskId = taskId;
    data.rid = res.data.id;
    delete data.id;
    return D('crazyclick_log')
      .add(data)
}

module.exports = {
  money: money
  , coin: coin
  , pv: pv
  , member: member
  , withdraw: withdraw
  , crazyClick: crazyClick
};
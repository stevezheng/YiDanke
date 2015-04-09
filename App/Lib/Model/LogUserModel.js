var util = require('util');
var moment = require('moment');

module.exports = Model(function() {
  return {
    /**
     * 用户登陆日志
     * @param userId
     * @param userUsername
     * @param userIP
     * @returns {*}
     */
    login: function(userId, userUsername, userIP) {
      var self = this;

      return self
        .add({
          logUserId: userId
          , logUserIp: userIP
          , logUserType: 0
          , logUserComment: util.format('用户:%s,于%s登陆系统', userUsername, moment().format('YYYY-MM-DD HH:mm:ss'))
        })
    },

    /**
     * 用户退出日志
     * @param userId
     * @param userUsername
     * @param userIP
     * @returns {*}
     */
    logout: function(userId, userUsername, userIP) {
      var self = this;

      return self
        .add({
          logUserId: userId
          , logUserIp: userIP
          , logUserType: 3
          , logUserComment: util.format('用户:%s,于%s退出系统', userUsername, moment().format('YYYY-MM-DD HH:mm:ss'))
        })
    },

    /**
     * 用户注册日志
     * @param userId
     * @param userUsername
     * @param userIP
     * @returns {*}
     */
    reg: function(userId, userUsername, userIP) {
      var self = this;

      return self
        .add({
          logUserId: userId
          , logUserIp: userIP
          , logUserType: 1
          , logUserComment: util.format('用户:%s,于%s注册系统', userUsername, moment().format('YYYY-MM-DD HH:mm:ss'))
        })
    },

    /**
     * 用户更新资料日志
     * @param userId
     * @param userUsername
     * @param userData
     * @param userIP
     * @returns {*}
     */
    update: function(userId, userUsername, userData, userIP) {
      var self = this;
      
      return self
        .add({
          logUserId: userId
          , logUserIp: userIP
          , logUserType: 2
          , logUserComment: util.format('用户:%s,于%s更新资料%s',
            userUsername,
            moment().format('YYYY-MM-DD HH:mm:ss'),
            JSON.stringify(userData)
          )
        })
        .catch(function(err) {
          console.error(err);
        })
    },

    /**
     * 用户删除日志
     * @param userId
     * @param userUsername
     * @param userIP
     * @returns {*}
     */
    del: function(userId, userUsername, userIP) {
      var self = this;

      return self
        .add({
          logUserId: userId
          , logUserIp: userIP
          , logUserType: -1
          , logUserComment: util.format('用户:%s,于%s被删除',
            userUsername,
            moment().format('YYYY-MM-DD HH:mm:ss')
          )
        })
    },
  }
});
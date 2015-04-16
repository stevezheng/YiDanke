module.exports = Model(function() {
  return {
    addOne: function(doTaskTerminal, doTaskUserId, doTaskTaskId, doTaskAccountId, doTaskAccountName, doTaskKeyword, doTaskFee, doTaskExtendFee) {
      var self = this;

      return self
        .add({
          doTaskStatus: 0
          , doTaskTerminal: doTaskTerminal
          , doTaskUserId: doTaskUserId
          , doTaskTaskId: doTaskTaskId
          , doTaskAccountId: doTaskAccountId
          , doTaskAccountName: doTaskAccountName
          , doTaskKeyword: doTaskKeyword
          , doTaskFee: doTaskFee
          , doTaskExtendFee: doTaskExtendFee
        })
    },
  }
});
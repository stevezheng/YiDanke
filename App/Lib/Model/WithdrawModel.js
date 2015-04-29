module.exports = Model(function() {
  return {
    addOne: function(userId, bankId, type, value, doTaskIds, comment) {
      var self = this;

      return self
        .add({
          withdrawUserId: userId
          , withdrawBankId: bankId
          , withdrawStatus: 0
          , withdrawType: type
          , withdrawValue: value
          , withdrawDoTaskIds: doTaskIds
          , withdrawComment: comment
        })
    },

    delOne: function() {

    },

    editOne: function() {

    },

    getOne: function() {

    },

    getAll: function() {

    }
  }
});
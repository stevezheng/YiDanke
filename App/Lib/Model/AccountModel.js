module.exports = Model(function() {
  return {
    fields: {
      'area': {
        valid: ['required']
        , msg: {
          required: '地区不能为空'
        }
      }
    },

    add: function() {

    }
  }
});
(function() {
  var Module = angular.module('YiAppAdmin.Setting', ['angularFileUpload']);

  Module.controller('settingCtrl', function($scope, $http, $upload) {
    console.log('ok');
    $scope.user = {};

    $scope.submit = function() {
      var oPassword = $scope.user.oPassword
        , password = $scope.user.password
        , rPassword = $scope.user.rPassword;
      if (!oPassword) {
        alert('请输入旧密码');
        return false;
      }

      if (!password) {
        alert('请输入新密码');
        return false;
      }

      if (!rPassword) {
        alert('请输入确认密码');
        return false;
      }

      if (password != rPassword) {
        alert('两次新密码不一样');
        return false;
      }

      $http.post('/admin/setting/editPassword', {oPassword: oPassword, password: password})
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
          } else {
            alert(res.errmsg);
          }
        })
    }
  });

})();
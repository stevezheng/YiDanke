(function() {
  var Module = angular.module('YiAppAdmin.PV', ['angularFileUpload']);

  Module.controller('pvCtrl', function($scope, $http, $upload) {
    $scope.args = {};

    $scope.query = function(args) {
      $http.post('/admin/pv/getclicks', args)
        .success(function(res) {
          console.log(res);
        })
    }
  });

})();
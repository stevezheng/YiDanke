(function() {
  var Module = angular.module('YiAppAdmin.PV', ['angularFileUpload']);

  Module.controller('pvCtrl', function($scope, $http, $upload) {
    $scope.args = {};

    $scope.page = 1;

    $scope.filter = {};
    $scope.query = function() {
      var filter = _.pick($scope.filter, function(value, key, object) {
        if (value != '') {
          return true;
        }
      });

      $http.post('/admin/pv', {page: $scope.page, data: filter})
        .success(function(res) {
          if (res.errno == 0) {
            $scope.data = res.data.data;
            $scope.total = res.data.total;
            $scope.count = res.data.count;
            $scope.num = res.data.num;

            $scope.totalPage = [];
            for (var i = 0; i < res.data.total; i++) {
              $scope.totalPage.push(i+1);
            }
          }
        })
    };

    $scope.changePage = function(page) {
      $scope.page = page;
      $scope.query();
    };

    $scope.query();

    $scope.getclicks = function(args) {
      args.date = moment(args.date).format('YYYYMMDD');
      $http.post('/admin/pv/getclicks', args)
        .success(function(res) {
          console.log(res);
          $('#show-detail').click();
          $scope.clicks = res.data.data.clicks;
          $scope.status = res.data.status;
        })
    }


  });

  Module.controller('pvAddCtrl', function($scope, $http, $upload) {
    function getQueryStringByUrl(name, url) {
      url = url.split('?')[1];
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = url.match(reg);
      if (r != null) return unescape(r[2]); return null;
    }

    $scope.pv = {};

    $scope.submit = function(pv) {
      pv.nid = getQueryStringByUrl('id', pv.item_url);
      delete pv.item_url;
      
      console.log(pv);

      $http.post('/admin/pv/add', pv)
        .success(function(res) {
          console.log(res);
          if (res.errno == 0) {
            alert(res.data);
            location.reload();
          }
        })
    }
  })

})();
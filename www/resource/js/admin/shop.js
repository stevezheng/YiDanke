(function() {
  var Module = angular.module('YiAppAdmin.Shop', ['angularFileUpload']);

  Module.controller('shopCtrl', function($scope, $http, $upload) {
    $scope.page = 1;

    $scope.edit = function(data) {
      new PCAS("province", "city", "area", data.shopProvince, data.shopCity, data.shopArea);
      $scope.cShop = data;
      $('#edit-shop').click();
    };

    $scope.submit = function() {
      var cShop = $scope.cShop;
      cShop.shopProvince = $('#province').val();
      cShop.shopCity = $('#city').val();
      cShop.shopArea = $('#area').val();
      $http.post('/admin/shop/edit', {
        id: cShop.id
        , shopUrl: cShop.shopUrl
        , shopName: cShop.shopName
        , shopProvince: cShop.shopProvince
        , shopCity: cShop.shopCity
        , shopArea: cShop.shopArea
        , shopAddress: cShop.shopAddress
        , shopExpressNumber: cShop.shopExpressNumber
      }).success(function(res) {
        if (res.errno == 0) {
          $('#btn-cancel').click();
          alert(res.data);
        }
      });
    };

    $scope.changePage = function(page) {
      $scope.page = page;
      getData();
    };

    $scope.pass = function(d) {
      $http.post('/admin/shop/pass', {id: d.id})
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
            d.shopStatus = 1;
          } else {
            alert(res.errmsg);
          }
        })
    };

    $scope.unpass = function(d) {
      $http.post('/admin/shop/unpass', {id: d.id})
        .success(function(res) {
          if (res.errno == 0) {
            alert(res.data);
            d.shopStatus = -1;
          } else {
            alert(res.errmsg);
          }
        })
    };

    function getData() {
      $http.post('/admin/shop', {page: $scope.page})
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
    }

    getData();

    $scope.statusMap = {
      status: {
        '-1': '拒绝'
        , '0': '待审核'
        , '1': '通过'
      },

      platform: {
        'taobao': '淘宝'
        , 'tmall': '天猫'
        , 'jd': '京东'
      }
    };
  });

})();
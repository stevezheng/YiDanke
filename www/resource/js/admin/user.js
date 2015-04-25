(function() {
  var statusMap = {
    status: {
      0: '禁用'
      , 1: '游客'
      , 2: '会员'
    }
  };

  var Module = angular.module('YiAppAdmin.User', ['angularFileUpload']);

  Module.controller('buyerCtrl', function($scope, $http, $upload) {
    $scope.filter = {};
    $scope.search = function() {
      var filter = _.pick($scope.filter, function(value, key, object) {
        if (value != '') {
          return true;
        }
      });

      $http.post('/admin/user/buyer', {page: $scope.page, data: filter})
        .success(function(res) {
          if (res.errno == 0) {
            $scope.users = res.data.data;
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
    $scope.statusMap = statusMap;
    $scope.member = function(user) {
      var r = confirm('确定要给该用户增加3个月会员?');
      if (r) {
        $http.post('/admin/user/member', {id: user.id, oldVipExprie: user.vipExprie})
          .success(function(res) {
            if (res.errno == 0) {
              var exprie;
              var _vipExprie = user.vipExprie;
              var vipExprie = moment().diff(_vipExprie, 'days');
              if (vipExprie < 0) {
                //尚未到期
                exprie = _vipExprie;
              } else {
                //已经到期
                exprie = moment();
              }

              var newExprie = moment(exprie).add(3, 'M').format('YYYY-MM-DD');
              alert(res.data);
              user.vipExprie = newExprie;
            }
          })
      }
    };

    $scope.addCoin = function(user) {
      var r = prompt('修改多少金币?');
      if (r) {
        $http.post('/admin/user/coin', {id: user.id, type: 'add', coin: r})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
              user.coin += parseFloat(r);
            }
          })
      }
    };

    $scope.addMoney= function(user) {
      var r = prompt('修改多少押金?');
      if (r) {
        $http.post('/admin/user/money', {id: user.id, type: 'add', money: r})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
              user.money += parseFloat(r);
            }
          })
      }
    };

    $scope.editPassword = function(user) {
      var r = prompt('请输入新密码');
      if (r) {
        $http.post('/admin/user/password', {id: user.id, type: 'password', password: r})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
            }
          })
      }
    };

    $scope.editTradePassword = function(user) {
      var r = prompt('请输入新密码');
      if (r) {
        $http.post('/admin/user/password', {id: user.id, type: 'tradepassword', password: r})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
            }
          })
      }
    };
    $scope.page = 1;

    $scope.changePage = function(page) {
      $scope.page = page;
      getUsers();
    };

    function getUsers() {
      $http.post('/admin/user/buyer', {page: $scope.page})
        .success(function(res) {
          if (res.errno == 0) {
            $scope.users = res.data.data;
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

    getUsers();
  });

  Module.controller('sellerCtrl', function($scope, $http, $upload) {
    $scope.filter = {};
    $scope.search = function() {
      var filter = _.pick($scope.filter, function(value, key, object) {
        if (value != '') {
          return true;
        }
      });

      $http.post('/admin/user/seller', {page: $scope.page, data: filter})
        .success(function(res) {
          if (res.errno == 0) {
            $scope.users = res.data.data;
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

    $scope.member = function(user) {
      var r = confirm('确定要给该用户增加3个月会员?');
      if (r) {
        $http.post('/admin/user/member', {id: user.id, oldVipExprie: user.vipExprie})
          .success(function(res) {
            if (res.errno == 0) {
              var exprie;
              var _vipExprie = user.vipExprie;
              var vipExprie = moment().diff(_vipExprie, 'days');
              if (vipExprie < 0) {
                //尚未到期
                exprie = _vipExprie;
              } else {
                //已经到期
                exprie = moment();
              }

              var newExprie = moment(exprie).add(3, 'M').format('YYYY-MM-DD');
              alert(res.data);
              user.vipExprie = newExprie;
            }
          })
      }
    };

    $scope.addMoney = function(user) {
      var r = prompt('修改多少押金?');
      if (r) {
        $http.post('/admin/user/money', {id: user.id, type: 'add', money: r})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
              user.money += parseFloat(r);
            }
          })
      }
    };

    $scope.addCoin = function(user) {
      var r = prompt('修改多少金币?');
      if (r) {
        $http.post('/admin/user/coin', {id: user.id, type: 'add', coin: r})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
              user.coin += parseFloat(r);
            }
          })
      }
    };

    $scope.editPassword = function(user) {
      var r = prompt('请输入新密码');
      if (r) {
        $http.post('/admin/user/password', {id: user.id, type: 'password', password: r})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
            }
          })
      }
    };

    $scope.editTradePassword = function(user) {
      var r = prompt('请输入新密码');
      if (r) {
        $http.post('/admin/user/password', {id: user.id, type: 'tradepassword', password: r})
          .success(function(res) {
            if (res.errno == 0) {
              alert(res.data);
            }
          })
      }
    };

    $scope.page = 1;

    $scope.changePage = function(page) {
      $scope.page = page;
      getUsers();
    };

    function getUsers() {
      $http.post('/admin/user/seller', {page: $scope.page})
        .success(function(res) {
          if (res.errno == 0) {
            $scope.users = res.data.data;
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

    getUsers();
    $scope.statusMap = statusMap;
  })
})();
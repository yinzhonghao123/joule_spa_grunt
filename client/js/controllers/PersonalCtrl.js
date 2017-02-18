define(['app', 'storageUtil'], function (app, storageUtil) {
    return app.controller('PersonalCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $rootScope.appTitle = '个人中心'

        //检查用户是否已经登陆, 如果没有提示跳转到login
        var user = storageUtil.local.getItem(storageUtil.KEYS.USER);
        if(user==null) {
            alert('请先登陆');
            window.location = '#/login';
            return;
        }

        $scope.user = user;

        $scope.toAddrsUI = function () {
            window.location = '#/addr_manage'
        }

        $scope.toFeedBackUI = function () {
            window.location = '#/feedback'
        }

        $scope.showOrders = function () {
            window.location = '/order/orderList?userId=' + user._id;
        }
    }])
})

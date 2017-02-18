define(['app', 'storageUtil'], function (app, storageUtil) {
    return app.controller('FeedbackCtrl', ['$scope', '$rootScope', 'serverService',
        function ($scope, $rootScope, serverService) {
            $rootScope.appTitle = '意见反馈'

            //读取user
            var user = storageUtil.local.getItem(storageUtil.KEYS.USER);
            $scope.feedback = {
                user_id : user._id,
                phone : user.phone
            }

            $scope.submit = function () {
                serverService.feedback($scope.feedback)
                    .then(function (result) {
                        alert('吐槽成功!');
                        window.location = '#/personal'
                    })
            }
    }])
})

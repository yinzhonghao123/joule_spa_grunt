
define(['app', 'storageUtil'], function (app, storageUtil) {
    return app.controller('LoginCtrl', ['$scope', '$rootScope','$interval', '$http', 'serverService',
        function ($scope, $rootScope, $interval, $http,serverService) {
            $rootScope.appTitle = '登 陆'

            $scope.timing = false;//是否正在计时
            $scope.btnText = '获取验证码';

            //开始计时
            $scope.startTime = function () {
                //检查手机号是否合法, 如果不合法提示, 结束
                if($scope.loginForm.phone.$invalid) {
                    $scope.loginForm.phone.$dirty = true;
                    return;
                }
                var time = 60;
                //time = 16; //测试
                $scope.btnText = time+'s重新获取';
                $scope.timing = true;//开始计时
                //使用$interval启动定时器
                var stop = $interval(function () {
                    //统计剩余时间
                    time--;
                    //不断改变btnText
                    $scope.btnText = time+'s重新获取';
                    //当计时完成, 停止计时, 更新btnText
                    if(time===0) {
                        $interval.cancel(stop);
                        $scope.btnText = '获取验证码';
                        $scope.timing = false;//停止计时
                    }
                }, 1000)

                //向服务器发送ajax请求: 生成随机验证码, 并发给指定的号码
                serverService.sendCode($scope.user.phone)
                    .then(function (result) {
                        console.log(result);
                    })
            }

            //登陆
            $scope.login = function () {

                serverService.login($scope.user)
                    .then(function (result) {
                        //判断登陆是否成功
                        if(result.code===1) {
                            alert('验证码不正确!');
                        } else {
                            var user = result.data;
                            alert(user.phone+'登陆成功');
                            //保存user到local
                            //localStorage.setItem('_user_', JSON.stringify(user));
                            storageUtil.local.setItem(storageUtil.KEYS.USER, user);
                            //跳转到home
                            window.location = '#/home'
                        }
                    }, function () {
                        alert('登陆出错啦');
                    })
            }
    }])
})

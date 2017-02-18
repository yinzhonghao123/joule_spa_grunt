define(['app', 'storageUtil'], function (app, storageUtil) {
    return app.controller('AddrManageCtrl', ['$scope', '$rootScope', 'serverService',
        function ($scope, $rootScope, serverService) {
            $rootScope.appTitle = '地址管理'

            //删除session中的edit_addr
            storageUtil.session.removeItem(storageUtil.KEYS.EDIT_ADDR);

            //读取user, 得到userid
            var user = storageUtil.local.getItem(storageUtil.KEYS.USER);
            //发送ajax请求, 得到对应的地址数组并显示
            serverService.getAddrsByUserId(user._id)
                .then(function (addrs) {
                    $scope.addrs = addrs;
                })

            $scope.toAddUI = function () {
                window.location = '#/add_new_addr';
            }

            //删除指定地址
            $scope.deleteAddr = function (index) {
                var addr = $scope.addrs[index];
                if(confirm('确定删除'+addr.contactor+'的地址吗?')) {
                    serverService.deleteAddr(addr._id)
                        .then(function (result) {
                            console.log(result);
                            alert('删除成功');
                            //更新页面
                            $scope.addrs.splice(index, 1);
                        })
                }
            }

            //更新指定地址
            $scope.toUpdateUI = function (addr) {
                //保存addr到session
                storageUtil.session.setItem(storageUtil.KEYS.EDIT_ADDR, addr)
                window.location = '#/add_new_addr';
            }

            $scope.toOrderConfirm = function (addr) {
                storageUtil.session.setItem(storageUtil.KEYS.ORDER_ADDR, addr);
                window.location = '#/order_confirm';
            }
    }])
})
